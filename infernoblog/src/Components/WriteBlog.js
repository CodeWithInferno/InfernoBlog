// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Button, TextField, Container, Typography, Paper, Box } from '@mui/material';
// import SaveIcon from '@mui/icons-material/Save';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
// // import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// const styles = {
//   container: {
//     marginTop: '20px',
//   },
//   paper: {
//     padding: '20px',
//   },
//   form: {
//     width: '100%',
//   },
//   editor: {
//     marginBottom: '20px',
//   },
//   preview: {
//     border: '1px solid #ccc',
//     padding: '10px',
//     minHeight: '300px',
//     maxHeight: '80vh',
//     overflowY: 'auto',
//   },
//   image: {
//     maxWidth: '100%',
//     height: 'auto',
//     marginTop: '10px',
//   },
//   classicUploadButton: {
//     marginTop: '10px',
//     fontSize: '16px',
//     padding: '10px',
//     backgroundColor: '#4CAF50',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },
//   smallPreview: {
//     maxWidth: '100px',
//     maxHeight: '100px',
//     marginTop: '5px',
//   },
// };

// function WriteBlog() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState('');
//   const [slug, setSlug] = useState('');
//   const [author, setAuthor] = useState('');
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

//   const generateSlug = (value) => {
//     return value
//       .toLowerCase()
//       .replace(/ /g, '-')
//       .replace(/[^\w-]+/g, '');
//   };

//   const handleTitleChange = (value) => {
//     setTitle(value);
//     const newSlug = generateSlug(value);
//     setSlug(newSlug);
//   };

//   const handleContentChange = (value) => {
//     setContent(value);
//   };

//   const handleClassicUpload = async () => {
//     document.getElementById('file-input').click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setUploadedImage(file);
//   };

//   const uploadImageToImgur = async (file) => {
//     const clientId = '5c6e2e1af3c8c67'; // Replace with your Imgur API Client ID

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await fetch('https://api.imgur.com/3/image', {
//         method: 'POST',
//         headers: {
//           Authorization: `Client-ID ${clientId}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         const imageUrl = data.data.link;
//         console.log('Imgur Image URL:', imageUrl);
//         return imageUrl;
//       } else {
//         console.error('Imgur API Error:', data);
//         return null;
//       }
//     } catch (error) {
//       console.error('Imgur API Request Error:', error);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const db = getFirestore();

//     try {
//       let profileUrl = null;

//       // Upload image to Imgur
//       if (uploadedImage) {
//         profileUrl = await uploadImageToImgur(uploadedImage);
//         setUploadedImageUrl(profileUrl);
//       }

//       // Save data to Firestore
//       const docRef = await addDoc(collection(db, 'blogs'), {
//         title,
//         content,
//         category,
//         slug,
//         author,
//         profile: profileUrl,
//         createdAt: new Date(),
//       });

//       console.log('Document written with ID: ', docRef.id);
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     }
//   };

//   return (
//     <Container component="main" maxWidth="lg" style={styles.container}>
//       <Paper elevation={3} style={styles.paper}>
//         <Typography component="h2" variant="h6">
//           Write a New Blog
//         </Typography>
//         <form style={styles.form} onSubmit={handleSubmit}>
//           <Box className={styles.editor}>
//             <TextField
//               label="Title"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={title}
//               onChange={(e) => handleTitleChange(e.target.value)}
//               required
//             />

//             <ReactQuill
//               value={content}
//               onChange={handleContentChange}
//               modules={{
//                 toolbar: [
//                   [{ header: '1' }, { header: '2' },{ header: '3' }, { font: [] }],
//                   ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote'],
//                   [{ list: 'ordered' }, { list: 'bullet' }],
//                   ['clean'],
//                   ['image'],
//                 ],
//               }}
//               style={{ minHeight: '300px' }}
//             />

//             <input
//               id="file-input"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//             />

//             <button type="button" style={styles.classicUploadButton} onClick={handleClassicUpload}>
//               Upload Blog Profile 
//             </button>

//             {uploadedImage && (
//               <div>
//                 <div>
//                   <Typography variant="caption">Preview:</Typography>
//                   <img
//                     src={URL.createObjectURL(uploadedImage)}
//                     alt="Uploaded Image Preview"
//                     style={styles.smallPreview}
//                   />
//                 </div>
//               </div>
//             )}

//           </Box>
//           <Box className={styles.preview}>
//             <Typography variant="h6">Preview</Typography>
//             <div dangerouslySetInnerHTML={{ __html: content }} style={{ maxWidth: '100%' }} />
//           </Box>
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
//             label="Author"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//           />
//           <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />} fullWidth>
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
import { Button, TextField, Container, Typography, Paper, Box, Select, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


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
  image: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: '10px',
  },
  classicUploadButton: {
    marginTop: '10px',
    fontSize: '16px',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  smallPreview: {
    maxWidth: '100px',
    maxHeight: '100px',
    marginTop: '5px',
  },
  doneButton: {
    marginTop: '10px',
    fontSize: '16px',
    padding: '10px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadProfileButtonVisible, setUploadProfileButtonVisible] = useState(true);

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    const newSlug = generateSlug(value);
    setSlug(newSlug);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleClassicUpload = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleDone = () => {
    // Set the first image as the profile picture
    const firstImage = document.querySelector('.ql-editor img');
    if (firstImage) {
      setUploadedImageUrl(firstImage.src);
      setUploadProfileButtonVisible(false);
    } else {
      console.error('No image found in the content.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore();

    try {
      // Wait for the image to load before saving to Firestore
      await new Promise((resolve) => {
        const checkImageLoaded = () => {
          if (uploadedImageUrl) {
            resolve();
          } else {
            setTimeout(checkImageLoaded, 100);
          }
        };
        checkImageLoaded();
      });

      // Save data to Firestore
      const docRef = await addDoc(collection(db, 'blogs'), {
        title,
        content,
        category,
        slug,
        author,
        profile: uploadedImageUrl, // Use the data URL as the profile picture
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
                  [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['clean'],
                  ['image'],
                ],
              }}
              style={{ minHeight: '300px' }}
            />

            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />


            <button type="button" style={styles.doneButton} onClick={handleDone}>
              Done
            </button>

            {uploadedImage && (
              <div>
                <div>
                  <Typography variant="caption">Preview:</Typography>
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded Image Preview"
                    style={styles.smallPreview}
                  />
                </div>
              </div>
            )}

          </Box>
          <Box className={styles.preview}>
            <Typography variant="h6">Preview</Typography>
            <div dangerouslySetInnerHTML={{ __html: content }} style={{ maxWidth: '100%' }} />
          </Box>

          {/* Updated Category field to use Select component */}
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            select
          >
            <MenuItem value="coding">Coding</MenuItem>
            <MenuItem value="news">News</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="sql">SQL</MenuItem>
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="tv">TV</MenuItem>
          </TextField>

          <TextField
            label="Slug"
            variant="outlined"
            fullWidth
            margin="normal"
            value={slug}
            disabled
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

          {/* Updated Submit button to remove the profile upload button */}
          <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />} fullWidth>
          Submit
        </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default WriteBlog;


















