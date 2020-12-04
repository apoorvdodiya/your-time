const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/your-time'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/your-time/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('server started on port ', process.env.PORT || 8080);
});