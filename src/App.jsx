import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppBarComponent from './components/AppBarComponent/AppBarComponent'
import SectionHome from './views/landingPage/SectionHome'
import SectionRegisterLogin from './views/landingPage/SectionRegisterLogin'
import SectionSignUp from './views/signUp/SectionSignUp'

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
          <Route path="signup" element={<SectionSignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
