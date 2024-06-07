import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppBarComponent from './components/AppBarComponent/AppBarComponent'
import SectionHome from './views/landingPage/SectionHome'
import SectionRegisterLogin from './views/landingPage/SectionRegisterLogin'
import SectionSignUp from './views/signUp/SectionSignUp'
import SectionTerms from './views/terms/SectionTerms'
import SectionAbout from './views/aboutUs/SectionAboutUs'
import InfoHome from './components/HomeComponent/infoHome/InfoHomeComponent'
import TermsHome from './components/HomeComponent/termsHome/HomeTermsComponent'
import { ProfileComponent } from './views/profile/Profile'
import SectionLogin from './views/login/SectionLogin'
import { FooterComponent } from './components/FooterComponent/FooterComponent'

import { UserProvider } from './contexts/userContext'
import { SectionVehicle } from './views/signUp/SectionVehicle'

function App() {
  return (
      <UserProvider>
        <BrowserRouter>
          <AppBarComponent/>
          <Routes>
            <Route path="/" element={
              <>
                <SectionHome />
                <SectionRegisterLogin />
                <InfoHome/>
                <TermsHome/>
              </>
            }>
            </Route>
            <Route path="aboutus" element={<SectionAbout />} />
            <Route path="login" element={<SectionLogin />} />
            <Route path="terms" element={<SectionTerms />} />
            <Route path="signup/driver" element={<SectionSignUp />} />
            <Route path="signup/passenger" element={<SectionSignUp />} />
            <Route path="user/profile/:userId" element={<ProfileComponent />} />
            <Route path="driver/vehicle/:userId" element={<SectionVehicle />} />
          </Routes>
          <FooterComponent /> 
        </BrowserRouter>
      </UserProvider>
  )
}

export default App
