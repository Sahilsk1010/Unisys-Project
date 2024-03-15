const express = require('express');
const multer  = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const upload = multer();

// Define the upload endpoint
app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        // Log the name of the video file received
        console.log('Video file name:', req.file.originalname);

        // Send the video file to the Flask API
        const formData = new FormData();
        formData.append('video', req.file.buffer, { filename: 'video.mp4' });

        const response = await axios.post('FLASK_API_URL', formData, {
            headers: {
                ...formData.getHeaders() // Get the headers for FormData
            },
        });

        // Forward the predictions received from Flask API to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

  
