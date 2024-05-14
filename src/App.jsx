import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppBarComponent from './components/AppBarComponent/AppBarComponent'
import SectionHome from './views/landingPage/SectionHome'
import SectionRegisterLogin from './views/landingPage/SectionRegisterLogin'
import SectionSignUp from './views/signUp/SectionSignUp'
import { ProfileComponent } from './views/profile/components/Profile'
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
              </>
            }>
            </Route>
            <Route path="login" element={<SectionLogin />} />
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
