// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const Recommendation = () => {
//   const [fetchedBlogs, setFetchedBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const db = getFirestore();
//         const blogsRef = collection(db, 'blogs');
//         const querySnapshot = await getDocs(blogsRef);

//         if (querySnapshot.empty) {
//           console.log('No matching documents for blogs.');
//           return;
//         }

//         const fetchedBlogsArray = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           fetchedBlogsArray.push(data);
//         });

//         setFetchedBlogs(fetchedBlogsArray);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const getRandomBlogs = (count) => {
//     const shuffledBlogs = [...fetchedBlogs].sort(() => 0.5 - Math.random());
//     return shuffledBlogs.slice(0, count);
//   };

//   const randomBlogs = getRandomBlogs(3);

//   // Updated styles
//   const containerStyle = {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'column',
//     marginTop: '20px',
//   };

//   const rowStyle = {
//     display: 'flex',
//     gap: '20px',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-start', // Align to the left
//   };

//   const boxStyle = {
//     padding: '0px',
//     margin: '20px 0', // Adjusted to add margin at the top
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '10px',
//     backgroundColor: '#fff',
//     textAlign: 'center',
//     width: '300px',
//     transition: 'transform 0.3s, box-shadow 0.3s', // Added transition for zoom effect
//   };

//   const titleStyle = {
//     margin: '10px 0 0',
//     fontSize: '1.2rem',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     transition: 'color 0.3s ease-in-out',
//   };

//   const linkStyle = {
//     display: 'block',
//     textDecoration: 'none',
//     color: '#000',
//   };

//   const imageStyle = {
//     width: '100%', // Adjusted to make the image touch all sides of the container
//     height: 'auto',
//     borderRadius: '10px', // Added borderRadius for a smoother look
//   };

//   // Add hover styles
//   const handleHover = (event) => {
//     event.currentTarget.style.transform = 'scale(1.05)';
//     event.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
//     event.currentTarget.querySelector('p').style.color = 'red'; // Update color of the nested p element
//   };

//   // Add mouse leave styles
//   const handleMouseLeave = (event) => {
//     event.currentTarget.style.transform = 'scale(1)';
//     event.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
//     event.currentTarget.querySelector('p').style.color = '#000'; // Reset color of the nested p element
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Recommended Blogs</h2>
//       <div className="red-divider"></div>

//       <div style={rowStyle}>
//         {randomBlogs.map((blog) => (
//           <div
//             key={blog.slug}
//             style={boxStyle}
//             onMouseEnter={handleHover}
//             onMouseLeave={handleMouseLeave}
//           >
//             <Link to={`/blog/${blog.slug}`} style={linkStyle}>
//               <img src={blog.profile} alt="Profile" style={imageStyle} />
//               <p style={{ ...titleStyle, color: '#000' }}>{blog.title}</p>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Recommendation;

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
