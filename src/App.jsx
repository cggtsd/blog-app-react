import { Login } from './components/Login'
import { Signup } from './components/Signup'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route ,Routes} from 'react-router';
import { Home } from './components/Home';
import { About } from './components/About';
import { Dashboard } from './components/user-module/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { ProfileInfo } from './components/user-module/ProfileInfo';
import { Services } from './components/Services';
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/> } />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/about" element={<About/> } />
        <Route path="/services" element={<Services/> } />
        
        <Route path="/user" element={<PrivateRoute />} >
          <Route path="dashboard" element={<Dashboard/> } />
          <Route path="profile-info" element={<ProfileInfo/> } />
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
