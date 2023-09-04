const fs  = require('fs');
const path = require('path');
const PdfPrinter = require('pdfmake');
const certiDB = require('../db/certiDB');
const projectDB = require('../db/projectDB');
const studentDB = require('../db/studentDB');
const {getEncryptedInfoByToken} = require('../lib/token/jwtUtils');
const pdfController = {
    getPDF :  async ( req , res ) => {
        try{
            const filename = req.params['filename'] || undefined;
            //------------------------------------------------------------------------
            // decoding user_id from JWT
            ///------------------------------------------------------------------------
            const cookie = req.cookies
            const token = cookie.accessToken
            const decode = await  getEncryptedInfoByToken(token)
            const user_id = decode.user_id;
            //------------------------------------------------------------------------
            // retrieving data from DB
            //------------------------------------------------------------------------   
            const  {id} = await studentDB.selectStudentID(user_id); //student ID
            const {firstname , lastname} =  await studentDB.selectStudentName(user_id);
            const fullName = firstname.concat('_',lastname)
            //------------------------------------------------------------------------
            // check for all certi related to a student
            //------------------------------------------------------------------------  
            // Case 1: No params "filename", get all the certi only
            if(!filename) { 
                const allCerti = await certiDB.selectCerti(id);
                if(allCerti.length == 0 ) return res.status(200).json([]);
                const reformat = allCerti.map( certi => certi.filename);
                return res.status(200).json(reformat);
            }
            // Case 2: Has params "filename", return <blob> to client
            const {pdf} = await certiDB.selectFile(filename,id); // blob
            const blob = Buffer.from(pdf)
            // Set the response headers
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${filename}.pdf`);
            res.send(blob);  
        }catch(err){
            console.log("Error in pdf Controller");
            console.log(err);
            return res.status(500).json('Error occurred');
        }
    },
    generatePDF : async ( req , res) =>{
        try{
            //------------------------------------------------------------------------
            // decoding user_id from JWT
            ///------------------------------------------------------------------------
            const cookie = req.cookies
            const token = cookie.accessToken
            const decode = await  getEncryptedInfoByToken(token)
            const user_id = decode.user_id;
            //------------------------------------------------------------------------
            // retrieving data from DB
            //------------------------------------------------------------------------   
            const  {id} = await studentDB.selectStudentID(user_id); //student ID
            const {firstname , lastname} =  await studentDB.selectStudentName(user_id);
            const completedProjects = await projectDB.selectFinishedProjectsByStudentID(id);
            const completedProjectArray = completedProjects.map( project => project.name)
            const fullName = firstname.concat('_',lastname);
            //------------------------------------------------------------------------
            // insert OR update
            //------------------------------------------------------------------------ 
            var queryType;
            const newDate = new Date().toISOString().slice(0, 10)
            const exist = await certiDB.selectCerti(id)
            const todayFile = await certiDB.selectCertiOnDate(id,newDate);
            const todayFileExist = todayFile.length == 0 ? true :false
            if(!exist){
                queryType = 'INSERT';
            }else {
                if(!todayFileExist){
                    queryType = 'UPDATE';
                }else{
                    queryType = 'INSERT';
                }  
            }
            const fileCount = exist.length || 0;
            if (fileCount >= 8){
                res.status(403).json("Exceed limit of orders of this month");
            }
            //------------------------------------------------------------------------
            // Load the PNG template file
            //------------------------------------------------------------------------ 
            const templateFilePath = (__dirname+'/../pdf/template.png');
            const templateBuffer = fs.readFileSync(templateFilePath);
            // Convert the PNG template buffer into a base64 string
             const templateBase64 = templateBuffer.toString('base64');
            //------------------------------------------------------------------------
            // path
            //------------------------------------------------------------------------  
            const currentDate = new Date().toISOString().slice(0, 10).split("-").join("_");
            const outputFileName = currentDate + "_"+fullName;
            const fontpath = (__dirname+'/../fonts/Roboto/');
            const outputDir = path.join(__dirname,".." ,'pdf');
            const outputFilePath = path.join(outputDir, `${outputFileName}.pdf`);
            //------------------------------------------------------------------------
            // PDF Config
            //------------------------------------------------------------------------  
            const fonts = {
                Roboto: {
                    normal: path.join(fontpath,'Roboto-Regular.ttf'),
                    bold: path.join(fontpath,'Roboto-Medium.ttf'),      
                    italics: path.join(fontpath,'Roboto-Italic.ttf'),
                    bolditalics: path.join(fontpath,'Roboto-MediumItalic.ttf'),
                }
            };
            const printer = new PdfPrinter(fonts);
            const docDefinition = {
                pageSize: {
                    width: 2000,
                    height: 1414,
                },
                background:  { image: `data:${templateFilePath};base64,${templateBase64}`},
                content: [
                    {
                        text: `${firstname} ${lastname}`,
                        style: 'name',
                        absolutePosition: {
                          x: 200,
                          y: 750,
                        },
                    },
                    {
                        text: `for engaging in below project(s):`,
                        style:'p',
                        absolutePosition: {
                          x: 200,
                          y: 900,
                        },
                    },
                    {
                        ul: completedProjectArray,
                        style: 'p',
                        absolutePosition: {
                          x: 200,
                          y: 950,
                        },
                    },
                    {
                        text: `Jouni Kononen`,
                        style: 'signature',
                        absolutePosition: {
                          x: 1000,
                          y: 1180,
                        },
                    }
                ],
                styles: {
                  name: {
                    color: '#00C49A',
                    fontSize: 100,
                    bold: true,
                  },
                  p: {
                    fontSize: 30,
                    color:'#227C7C'
                  },
                  signature: {
                    fontSize: 40,
                    color:'#227C7C'
                  }
                },
              };           
            const pdfDoc = printer.createPdfKitDocument(docDefinition);
            const writeStream = fs.createWriteStream(outputFilePath, {flags: 'w' });
            pdfDoc.pipe(writeStream);
            pdfDoc.end();
            
            writeStream.on("finish", async () => {
                const buffer = fs.readFileSync(outputFilePath);
                if(queryType == "INSERT"){
                    await certiDB.insertCerti(outputFileName, buffer, newDate ,id);  
                }else{
                    await certiDB.updateCerti(outputFileName, buffer,newDate,id);
                }        
                // Set the response headers
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=${outputFileName}.pdf`);
                const fileStream = fs.createReadStream(outputFilePath);
                fileStream.pipe(res);
                
            });
            writeStream.on("end", async() => fs.unlinkSync(outputFilePath));
        }catch(err){
            console.log("Error in pdf Controller");
            console.log(err)
            return res.status(500).json('Error occurred while generating PDF. Please try again');
        }
    }
}

module.exports = pdfController;