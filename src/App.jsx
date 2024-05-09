import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppBarComponent from './components/AppBarComponent/AppBarComponent'
import SectionHome from './views/landingPage/SectionHome'
import SectionRegisterLogin from './views/landingPage/SectionRegisterLogin'
import SectionSignUp from './views/signUp/SectionSignUp'
import { ProfileComponent } from './views/profile/components/Profile'
import SectionLogin from './views/login/SectionLogin'

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
            </>
          }>
          </Route>
          <Route path="login" element={<SectionLogin />} />
          <Route path="signup" element={<SectionSignUp />} />
          <Route path="profile" element={<ProfileComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
