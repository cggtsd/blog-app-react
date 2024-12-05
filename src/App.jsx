import { Login } from './components/Login'
import { Signup } from './components/Signup'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer position="bottom-center"/>
      <Signup/>
      {/* <Login/> */}
   </>
  )
}

export default App
