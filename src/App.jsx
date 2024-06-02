import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppBarComponent from './components/AppBarComponent/AppBarComponent'
import SectionAbout from './views/AboutUs/SectionAboutUs'
import SectionHome from './views/landingPage/SectionHome'
import SectionRegisterLogin from './views/landingPage/SectionRegisterLogin'
import SectionSignUp from './views/signUp/SectionSignUp'
import { ProfileComponent } from './views/profile/components/Profile'
import SectionLogin from './views/login/SectionLogin'
import InfoHome from './components/HomeComponent/Info Home/InfoHomeComponent'
import TermsHome from './components/HomeComponent/Terms Home/HomeTermsComponent'
import SectionTerms from './views/Terms/SectionTerms'
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
            <Route path="About" element={<SectionAbout />} />
            <Route path="login" element={<SectionLogin />} />
            <Route path="Terms" element={<SectionTerms />} />
            <Route path="signup/driver" element={<SectionSignUp />} />
            <Route path="signup/passenger" element={<SectionSignUp />} />
            <Route path="driver/profile" element={<ProfileComponent />} />
            <Route path="driver/vehicle" element={<SectionVehicle />} />
            <Route path="passenger/profile" element={<ProfileComponent />} />
          </Routes>
          <FooterComponent /> 
        </BrowserRouter>
      </UserProvider>
  )
}

export default App
