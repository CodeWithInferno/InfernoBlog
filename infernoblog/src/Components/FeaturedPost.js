// BlogPost.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function BlogPost() {
  const { slug } = useParams();
  const [blogContent, setBlogContent] = useState('');

  useEffect(() => {
    const loadBlogContent = async () => {
      try {
        const db = getFirestore();
        const blogsRef = collection(db, 'blogs');

        const q = query(blogsRef, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
          console.log('No matching documents.');
          return;
        }

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setBlogContent(data.content);
        });
      } catch (error) {
        console.error('Error fetching blog content:', error);
      }
    };

    loadBlogContent();
  }, [slug]);

  return (
    <div className="blog-post">
      <h1>{slug}</h1>
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogContent }} />
    </div>
  );
}

export default BlogPost;
