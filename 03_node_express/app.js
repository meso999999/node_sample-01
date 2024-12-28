//expressを読み込み
const express = require('express');
//expresssを使用するための準備
const app = express();

//「localhost:3000」にアクセスすると「index.ejs」が表示される。
app.get('/index', (req, res) => {
  res.render('index.ejs');
});

//「localhost:3000/top」にアクセスすると「top.ejs」が表示される。
app.get('/top', (req, res) => {
  res.render('top.ejs');
});

//「localhost:3000/test」にアクセスすると「test.ejs」が表示される。
app.get('/test', (req, res) => {
  res.render('test.ejs');
});

app.listen(3000);