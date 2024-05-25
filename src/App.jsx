import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppBarComponent from './components/AppBarComponent/AppBarComponent'
import SectionAbout from './views/AboutUs/SectionAboutUs'
import SectionHome from './views/landingPage/SectionHome'
import SectionRegisterLogin from './views/landingPage/SectionRegisterLogin'
import SectionSignUp from './views/signUp/SectionSignUp'
import { ProfileComponent } from './views/profile/components/Profile'
import SectionLogin from './views/login/SectionLogin'
import InfoHome from './components/HomeComponent/InfoHomeComponent'

function App() {
  return (
    <>
      <AppBarComponent/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <SectionHome />
              <SectionRegisterLogin />
              <InfoHome/>
            </>
          }>
          </Route>
          <Route path="About" element={<SectionAbout />} />
          <Route path="login" element={<SectionLogin />} />
          <Route path="signup" element={<SectionSignUp />} />
          <Route path="profile" element={<ProfileComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
