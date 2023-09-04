//------------------------------------------------------------
// import Components
//------------------------------------------------------------
import {HeaderContainer, AboutContainer , ProjectContainer , LinkToRegisterContainer , FooterContainer} from './LandingPageComponents/Import'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-custom-black font-Inter">
      {/* Header container*/}
        <HeaderContainer  />
        
      {/* About container */}
        <AboutContainer />

      {/* Project container*/}
      <ProjectContainer />

      {/* Link to register page */}
      <LinkToRegisterContainer  />
      
      {/* Footer container*/}
      <FooterContainer />
    </main>
  )
}
