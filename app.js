app.post('/upload', upload.single('video'), async (req, res) => {
    try {
      // Log the name of the video file received
      console.log('Video file name:', req.file.originalname);
  
      // Send the video file to the Flask API
      const formData = new FormData();
      formData.append('video', req.file.buffer, { filename: 'video.mp4' });
  
      const response = await axios.post('FLASK_API_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Forward the predictions received from Flask API to the client
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  