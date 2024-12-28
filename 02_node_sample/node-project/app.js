const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.render('index.ejs');
});

//この部分を追加します。
app.get('/test', (req, res) => {
  res.render('test.ejs');
});

app.listen(3000);