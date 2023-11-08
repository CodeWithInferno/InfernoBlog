// imageUpload.js

const axios = require('axios');
const FormData = require('form-data');

const cloudName = 'dbisysfnz';
const apiKey = '236722587189158';
const apiSecret = 'VMcOMCQBEHiVF30JWiu-NzZ8t-4';

// You would typically pass the file path as an argument when running the script.
const filePath = 'path/to/your/image.jpg';

const formData = new FormData();
formData.append('file', require('fs').createReadStream(filePath));
formData.append('upload_preset', 'your_preset');

axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
  headers: {
    ...formData.getHeaders(),
  },
  auth: {
    username: apiKey,
    password: apiSecret,
  },
})
  .then((response) => {
    console.log('Image uploaded:', response.data.url);
  })
  .catch((error) => {
    console.error('Error uploading image:', error);
  });
