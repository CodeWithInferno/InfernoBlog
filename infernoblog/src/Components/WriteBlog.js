// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Button, TextField, Container, Typography, Grid, Paper } from '@mui/material';
// import SaveIcon from '@mui/icons-material/Save';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// import slugify from 'slugify';

// const styles = {
//   container: {
//     marginTop: '20px',
//   },
//   paper: {
//     padding: '20px',
//   display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     width: '100%',
//   },
// };

// function WriteBlog() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState('');
//   const [slug, setSlug] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [author, setAuthor] = useState('');

//   const generateSlug = (value) => {
//     return slugify(value, {
//       replacement: '-',
//       lower: true,
//     });
//   };

//   const handleTitleChange = (value) => {
//     setTitle(value);
//     const newSlug = generateSlug(value);
//     setSlug(newSlug);
//   };

//   const handleContentChange = (value) => {
//     setContent(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const db = getFirestore();

//     try {
//       const docRef = await addDoc(collection(db, 'blogs'), {
//         title,
//         content,
//         category,
//         slug,
//         imageUrl,
//         author,
//         createdAt: new Date(),
//       });

//       console.log('Document written with ID: ', docRef.id);
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="sm" style={styles.container}>
//       <Paper elevation={3} style={styles.paper}>
//         <Typography component="h2" variant="h6">
//           Write a New Blog
//         </Typography>
//         <form style={styles.form} onSubmit={handleSubmit}>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={title}
//             onChange={handleTitleChange}
//             required
//           />
//           <ReactQuill
//             value={content}
//             onChange={handleContentChange}
//             modules={{
//               toolbar: [
//                 [{ header: '1' }, { header: '2' }, { font: [] }],
//                 ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote'],
//                 [{ list: 'ordered' }, { list: 'bullet' }],
//                 ['clean'],
//               ],
//             }}
//           />
//           <TextField
//             label="Category"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             required
//           />
//           <TextField
//             label="Slug"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={slug}
//             disabled
//           />
//           <TextField
//             label="Image URL"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={imageUrl}
//             onChange={(e) => setImageUrl(e.target.value)}
//             required
//           />
//           <TextField
//             label="Author"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             startIcon={<SaveIcon />}
//             fullWidth
//           >
//             Submit
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// }

// export default WriteBlog;



import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, TextField, Container, Typography, Paper, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import axios from 'axios';
import slugify from 'slugify';

const styles = {
  container: {
    marginTop: '20px',
  },
  paper: {
    padding: '20px',
  },
  form: {
    width: '100%',
  },
  editor: {
    marginBottom: '20px',
  },
  preview: {
    border: '1px solid #ccc',
    padding: '10px',
    minHeight: '300px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
};

function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [slug, setSlug] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');

  const cloudName = 'dbisysfnz'; // Replace with your Cloudinary Cloud Name
  const apiKey = '236722587189158'; // Replace with your Cloudinary API Key
  const apiSecret = 'VMcOMCQBEHiVF30JWiu-NzZ8t-4'; // Replace with your Cloudinary API Secret

  const generateSlug = (value) => {
    return slugify(value, {
      replacement: '-',
      lower: true,
    });
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    const newSlug = generateSlug(value);
    setSlug(newSlug);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImageSelect = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const uploadImageToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_preset'); // Create an upload preset in your Cloudinary account

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          auth: {
            username: apiKey,
            password: apiSecret,
          },
        }
      );

      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleUploadImage = async () => {
    if (selectedImage) {
      const imageUrl = await uploadImageToCloudinary(selectedImage);
      if (imageUrl) {
        const updatedContent = content + `<img src="${imageUrl}" alt="Uploaded Image" />`;
        setContent(updatedContent);
        setImageUrl(imageUrl);
      }
    }
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
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Container component="main" maxWidth="lg" style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
        <Typography component="h2" variant="h6">
          Write a New Blog
        </Typography>
        <form style={styles.form} onSubmit={handleSubmit}>
          <Box className={styles.editor}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['clean'],
                  ['image'], // Enable image pasting
                ],
              }}
              style={{ minHeight: '300px' }}
            />
          </Box>
          <Box className={styles.preview}>
            <Typography variant="h6">Preview</Typography>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Box>
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <TextField
            label="Slug"
            variant="outlined"
            fullWidth
            margin="normal"
            value={slug}
            disabled
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SaveIcon />}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default WriteBlog;
