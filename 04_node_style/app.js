const express = require('express');
const app = express();

//'link'の部分はファイルをしている。
app.use(express.static('link'))

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(3000);