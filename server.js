const express = require('express');
const { SignProtocol } = require('sign-protocol-sdk'); // Placeholder for actual Sign Protocol SDK
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Simulating storing confessions in memory for demo purposes
let confessions = [];

// Endpoint to submit confession
app.post('/api/submit-confession', async (req, res) => {
  const confessionText = req.body.confession;

  if (!confessionText) {
    return res.status(400).send('Confession cannot be empty.');
  }

  // Sign the confession using Sign Protocol (simulating with a placeholder)
  const signedConfession = await SignProtocol.sign(confessionText);

  // Store the confession (this can be saved to IPFS in a real app)
  confessions.push({
    text: confessionText,
    signed: signedConfession.signature,
    timestamp: new Date(),
  });

  res.status(200).json({ status: 'success' });
});

// Endpoint to get recent confessions
app.get('/api/confessions', (req, res) => {
  res.status(200).json(confessions);
});

// Serve static files (frontend)
app.use(express.static('public'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
