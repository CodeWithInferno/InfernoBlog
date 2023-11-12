import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../styles/regular.css'; // Make sure to update the path to your CSS file

const Recommendation = () => {
  const [fetchedBlogs, setFetchedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getFirestore();
        const blogsRef = collection(db, 'blogs');
        const querySnapshot = await getDocs(blogsRef);

        if (querySnapshot.empty) {
          console.log('No matching documents for blogs.');
          return;
        }

        const fetchedBlogsArray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedBlogsArray.push(data);
        });

        setFetchedBlogs(fetchedBlogsArray);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const getRandomBlogs = (count) => {
    const shuffledBlogs = [...fetchedBlogs].sort(() => 0.5 - Math.random());
    return shuffledBlogs.slice(0, count);
  };

  const randomBlogs = getRandomBlogs(3);

  return (
    <div className="flex justify-between">
      {randomBlogs.map((blog) => (
        <div key={blog.slug} className="blog-card">
          <div className="image-container">
            <Link to={`/blog/${blog.slug}`} className="block w-full h-full">
              <img src={blog.profile} alt="Banner" className="banner-image" />
            </Link>
          </div>
          <div className="content-container">
            <h5 className="title">{blog.title}</h5>
            <p className="description">{blog.description}</p>
          </div>
          <div className="button-container">
            <Link to={`/blog/${blog.slug}`}>
              <button className="read-more-button">Read More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;