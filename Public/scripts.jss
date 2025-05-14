// When the user submits the confession
document.getElementById('confession-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const confessionText = document.getElementById('confession-text').value;

  // Send confession to the backend to be signed and stored
  const response = await fetch('/api/submit-confession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confession: confessionText })
  });

  const data = await response.json();
  if (data.status === 'success') {
    alert('Your confession is now verified!');
    loadConfessions(); // Reload the confession feed
  }
});

// Load confessions and display them
async function loadConfessions() {
  const response = await fetch('/api/confessions');
  const confessions = await response.json();

  const feed = document.getElementById('feed');
  feed.innerHTML = '';
  confessions.forEach(confession => {
    const confessionElement = document.createElement('div');
    confessionElement.innerHTML = `
      <p>${confession.text}</p>
      <small>Verified: ${confession.signed}</small>
    `;
    feed.appendChild(confessionElement);
  });
}

loadConfessions(); // Initially load confessions
