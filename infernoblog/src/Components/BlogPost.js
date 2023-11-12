import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import AtomicSpinner from 'atomic-spinner'; // Import the loader component
import './BlogPost.css';

function BlogPost() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogContent, setBlogContent] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const loadBlogContent = async () => {
      try {
        setLoading(true); // Show loader when starting to fetch data

        const db = getFirestore();
        const blogsRef = collection(db, 'blogs');
        const querySnapshot = await getDocs(blogsRef);

        if (querySnapshot.empty) {
          console.log('No matching documents.');
          setLoading(false); // Hide loader if there are no documents
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
            setAuthor(data.author.toUpperCase());
            setCategory(data.category.toUpperCase());
          } else {
            if (data.publishedAt) {
              const date = new Date(data.publishedAt.toDate());
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              data.publishedDate = date.toLocaleDateString('en-US', options);
            }
            setRelatedBlogs((prevBlogs) => [...prevBlogs, data]);
          }
        });

        setLoading(false); // Hide loader when data is successfully fetched
      } catch (error) {
        console.error('Error fetching blog content:', error);
        setLoading(false); // Hide loader in case of an error
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

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <AtomicSpinner size="50" color="#007bff" />
        </div>
      ) : (
        <>
          {/* Blog header */}
          <div className="blog-header" style={{ marginBottom: '40px' }}>
            <h1 className="blog-title">{title}</h1>
            <p className="published-at" style={{ marginTop: '40px' }}>
              PUBLISHED <span style={{ fontWeight: 'normal' }}>{publishedAt}</span> 
              <span style={{ margin: '0 5px' }}>|</span> BY <span style={{ fontWeight: 'bold', color: 'red' }}>{author}</span>
            </p>
          </div>
          
          {/* Blog content */}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogContent }} />
        </>
      )}
    </div>
  );
}

export default BlogPost;
