import { Routes,Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header.js"
import Post from "./components/Post.js"
import Layout from './components/Layout';
import Indexpage from './components/Indexpage';
import Loginpage from './components/Loginpage';
import Registerpage from './components/Registerpage';
import CreatePost from './components/CreatePost';
import PostPage from './components/PostPage';
import {UserContextProvider} from "./contexts/UserContext";
import EditPost from './components/EditPost';

function App() {
  

  
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Indexpage/>}/>
          <Route path={'/login'} element={<Loginpage/>}/>
          <Route path={'/register'} element={<Registerpage/>}/>
          <Route path={'/create'} element={<CreatePost/>}></Route>
          <Route path={'/post/:id'} element={<PostPage/>}></Route>
          <Route path={'/edit/:id'} element={<EditPost/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
