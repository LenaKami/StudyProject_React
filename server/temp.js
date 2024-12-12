const express = require('express');
const app = express();

// Prosta trasa zwracająca JSON
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Hello, World!',
    success: true
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});