import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useAuth } from './Auth/AuthContext';

function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore();

    try {
      const docRef = await addDoc(collection(db, 'blogs'), {
        title,
        content,
        category,
        slug,
        imageUrl,
        author: currentUser.uid,
        createdAt: new Date(),
      });

      console.log('Document written with ID: ', docRef.id);

      // Redirect to the blog post or another page
      // For example, navigate to `/blog/${docRef.id}`
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h2>Write a New Blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write your blog content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Slug</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default WriteBlog;
