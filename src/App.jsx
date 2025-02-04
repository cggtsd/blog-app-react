import { Login } from './components/Login'
import { Signup } from './components/Signup'
import 'react-toastify/dist/ReactToastify.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route ,Routes} from 'react-router';
import { Home } from './components/Home';
import { About } from './components/About';
import { Dashboard } from './components/user-module/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import { ProfileInfo } from './components/user-module/ProfileInfo';
import { Services } from './components/Services';
import './App.css'
import PostPage from './components/PostPage';
import Categories from './components/Categories';
import PageNotFound from './components/PageNotFound';
import UserProvider from './context/UserProvider';
import UpdateBlog from './components/UpdateBlog';
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <ToastContainer position="bottom-center"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/> } />
        <Route path="/signup" element={<Signup/> } />
        <Route path="/about" element={<About/> } />
        <Route path="/services" element={<Services/> } />
        <Route path="/posts/:postId" element={<PostPage/> } />
        <Route path="/categories/:categoryId" element={<Categories/> } />
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/user" element={<PrivateRoute />} >
          <Route index element={<Dashboard/> }/>
          <Route path="dashboard" element={<Dashboard/> } />
          <Route path="profile-info/:userId" element={<ProfileInfo/> } />
          <Route path="update-blog/:blogId" element={<UpdateBlog/> } />
        </Route>
      </Routes>
      </BrowserRouter>
      </UserProvider>
  )
}

export default App
