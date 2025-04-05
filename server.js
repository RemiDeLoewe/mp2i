const express = require('express');
const path = require('path');
const quotes_db = require('./static/datas/quotes.json')
const http = require('http');

const app = express();

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
  });
  
  
app.use('/static', express.static(path.join(__dirname , 'static')));
app.get('/api/get-quotes/', (req, res) =>{  
  res.status(200).json({quotes_db});
})

// Démarrer le serveur
const PORT = process.env.PORT || 8600;
server.listen(PORT, () => {
  console.log(`Serveur HTTP et WebSocket démarré sur le port ${PORT}`);
});