import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Blogs from "./pages/Blogs";
import Login from "./pages/login";
import Register from "./pages/register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>

        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
