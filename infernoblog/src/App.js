import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/home';
import SignUp from './Components/Auth/Register';
import SignIn from './Components/Auth/Login';
import LandingPage from './Components/LandingPage';
import BlogListMUI from './Components/BlogList';
import WriteBlog from './Components/WriteBlog';
import './styles/tailwind.css';
import BlogPost from './Components/BlogPost';
import BlogList from './Components/BlogList';
import FooterComponent from './Components/Footer';
import ReaderCard from './Components/RelatedMovie';
// import { LoadingProvider } from './Components/LoadingContext';
import RelatedToTv from './Components/RelatedToTv';
// import { useLoading } from './Components/LoadingContext'; // Import the useLoading hook

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bloglist" element={<BlogListMUI />} />
          <Route path="/WriteBlog" element={<WriteBlog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/reader" element={<ReaderCard />} />
          <Route path="/tv" element={<RelatedToTv />} />
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;










