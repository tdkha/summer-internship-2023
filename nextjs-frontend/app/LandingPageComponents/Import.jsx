import React from 'react'
import Footer from "../../components/Footer"
import About from "./About"
import Header from "./Header"
import Project from "./Project"
import LinkToRegister from './LinkToRegister';

 const HeaderContainer = () => {
  return <Header/>
}
 const AboutContainer = () => {
  return <About/>
}
 const ProjectContainer = () => {
  return <Project/>
}
 const LinkToRegisterContainer = () =>{
    return <LinkToRegister/>
}
 const FooterContainer = () =>{
  return <Footer/>
}
module.exports = {HeaderContainer , AboutContainer , ProjectContainer, LinkToRegisterContainer, FooterContainer}