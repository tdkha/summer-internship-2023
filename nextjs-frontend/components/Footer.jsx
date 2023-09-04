export default function Footer() {
   
    return (
       <footer className="  w-full text-white  bg-custom-dim-black flex gap-8 justify-evenly items-center min-h-[180px] px-4 py-16 md:gap-28">
         <div><h1 className="text-base md:text-lg lg:text-xl">Contact Information</h1></div>
         
        <div className=" rounded-sm flex flex-col gap-1">
            <h1 className="text-sm md:text-base lg:text-xl">Call us</h1>
            <p className="text-xs grey-text md:text-sm lg:text-base">Mon-Fri from 10am to 4pm.</p>
            <p className="text-xs grey-text mt-2 md:text-sm lg:text-base">0123456789</p>
        </div>

        <div className=" rounded-lg flex flex-col gap-1">
            <h1 className="text-sm md:text-base lg:text-xl">Visit us</h1>
            <p className="text-xs grey-text md:text-sm lg:text-base">LAB building.</p>
            <p className="text-xs grey-text mt-2 md:text-sm lg:text-base">Yliopistonkatu 34, 53850 Lappeenranta, Finland</p>
        </div>
       </footer>
    )
  }