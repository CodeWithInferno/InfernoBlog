import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import slugify from 'slugify'; // You'll need to install this library
// Import the slugify library or function that generates slugs

function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [slug, setSlug] = useState(''); // Add a state for the slug
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');

  // Function to generate a slug from the title
  const generateSlug = (value) => {
    return slugify(value, {
      replacement: '-', // Replace spaces with a dash
      lower: true, // Convert to lowercase
    });
  };

  // Update the slug when the title changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    const newSlug = generateSlug(e.target.value);
    setSlug(newSlug);
  };

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
        author,
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
            onChange={handleTitleChange} 
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
            placeholder="Auto-generated slug"
            value={slug}
            readOnly
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
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author's name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
