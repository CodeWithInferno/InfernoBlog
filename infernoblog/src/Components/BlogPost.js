// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// import './BlogPost.css'; // Import your CSS file for styling

// function BlogPost() {
//   const { slug } = useParams();
//   const [blogContent, setBlogContent] = useState('');
//   const [publishedAt, setPublishedAt] = useState('');
//   const [author, setAuthor] = useState('');
//   const [title, setTitle] = useState('');

//   useEffect(() => {
//     const loadBlogContent = async () => {
//       try {
//         const db = getFirestore();
//         const blogsRef = collection(db, 'blogs');

//         const q = query(blogsRef, where('slug', '==', slug));
//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.size === 0) {
//           console.log('No matching documents.');
//           return;
//         }

//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           setTitle(data.title);
//           setBlogContent(data.content);
//           const date = new Date(data.createdAt.toDate());
//           const options = { year: 'numeric', month: 'long', day: 'numeric' };
//           const formattedDate = date.toLocaleDateString('en-US', options);
//           setPublishedAt(formattedDate);
//           setAuthor(data.author);
//         });
//       } catch (error) {
//         console.error('Error fetching blog content:', error);
//       }
//     };

//     loadBlogContent();
//   }, [slug]);
//   const authorInfo = {
//     name: 'Author Name',
//     image: 'url-to-author-image.jpg', // Replace with the URL of the author's image
//     about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...', // Replace with the author's description
//   };
//   return (
//     <div className="blog-container">
//       <div className="blog-header">
//         <h1 className="blog-title">{title}</h1>
//         <p className="published-at">
//           PUBLISHED: 
//           <span>{publishedAt}</span>
//           <span className="published-divider"></span> {/* Vertical divider */}
//           BY: 
//           <span className="by">{author}</span>
//         </p>
//       </div>
//       <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogContent }} />
//       <div className="more-like-this">
//         <p className="more-like-this-text">MORE LIKE THIS</p>
//         <div className="red-divider"></div>
//       </div>
//     </div>
//   );
// }

// export default BlogPost;


// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import './BlogPost.css';
// import Recommendation from './Recommendation'; // Import the Recommendation component



// // BlogPost Component
// function BlogPost() {
//   const { slug } = useParams();
//   const [blogContent, setBlogContent] = useState('');
//   const [publishedAt, setPublishedAt] = useState('');
//   const [author, setAuthor] = useState('');
//   const [title, setTitle] = useState('');
//   const [relatedBlogs, setRelatedBlogs] = useState([]);

//   // Fetch blog content based on the slug
//   useEffect(() => {
//     const loadBlogContent = async () => {
//       try {
//         const db = getFirestore();
//         const blogsRef = collection(db, 'blogs');
//         const querySnapshot = await getDocs(blogsRef);

//         if (querySnapshot.empty) {
//           console.log('No matching documents.');
//           return;
//         }

//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           if (data.slug === slug) {
//             setTitle(data.title);
//             setBlogContent(data.content);
//             const date = new Date(data.createdAt.toDate());
//             const options = { year: 'numeric', month: 'long', day: 'numeric' };
//             setPublishedAt(date.toLocaleDateString('en-US', options));
//             setAuthor(data.author);
//           } else {
//             if (data.publishedAt) {
//               const date = new Date(data.publishedAt.toDate());
//               const options = { year: 'numeric', month: 'long', day: 'numeric' };
//               data.publishedDate = date.toLocaleDateString('en-US', options);
//             }
//             setRelatedBlogs((prevBlogs) => [...prevBlogs, data]);
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching blog content:', error);
//       }
//     };

//     loadBlogContent();
//   }, [slug]);

//   return (
//     <div className="blog-container">
//       <div className="blog-header">
//         <h1 className="blog-title">{title}</h1>
//         <p className="published-at">
//           PUBLISHED <span>{publishedAt}</span> BY {author}
//         </p>
//       </div>
//       <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogContent }} />
      
//       </div>
      
//   );
// }

// export default BlogPost;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './BlogPost.css';


function BlogPost() {
  const { slug } = useParams();
  const [blogContent, setBlogContent] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const loadBlogContent = async () => {
      try {
        const db = getFirestore();
        const blogsRef = collection(db, 'blogs');
        const querySnapshot = await getDocs(blogsRef);

        if (querySnapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.slug === slug) {
            setTitle(data.title);
            setBlogContent(data.content);
            const date = new Date(data.createdAt.toDate());
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            setPublishedAt(date.toLocaleDateString('en-US', options));
            setAuthor(data.author.toUpperCase()); // Ensure author name is in uppercase
            setCategory(data.category.toUpperCase()); // Ensure category is in uppercase
          } else {
            if (data.publishedAt) {
              const date = new Date(data.publishedAt.toDate());
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              data.publishedDate = date.toLocaleDateString('en-US', options);
            }
            setRelatedBlogs((prevBlogs) => [...prevBlogs, data]);
          }
        });
      } catch (error) {
        console.error('Error fetching blog content:', error);
      }
    };

    loadBlogContent();
  }, [slug]);

  return (
    <div className="blog-container">
      {/* Breadcrumb navigation */}
      <div className="breadcrumb" style={{ fontWeight: 'bold', marginBottom: '30px', marginTop: '30px' }}>
        <Link to="/blogs" style={{ color: 'red', textDecoration: 'none' }}>
          HOME
        </Link>{' '}
        |{' '}
        <span style={{ color: 'red' }}>
          {category}
        </span>
      </div>

      {/* Blog header */}
      <div className="blog-header">
        <h1 className="blog-title">{title}</h1>
        <p className="published-at">
          PUBLISHED <span style={{ fontWeight: 'normal' }}>{publishedAt}</span> 
          <span style={{ margin: '0 5px' }}>|</span> BY <span style={{ fontWeight: 'bold', color: 'red' }}>{author}</span>
        </p>
      </div>
      
      {/* Blog content */}
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogContent }} />
    </div>
  );
}

export default BlogPost;
