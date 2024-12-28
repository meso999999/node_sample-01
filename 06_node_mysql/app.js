require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.static('link'))

// MySQLを使うためのインストールしたmysqlを呼び出す
const mysql = require('mysql2');

//フォームの値を受け取るために必要な典型文
app.use(express.urlencoded({extended: false}));

// 環境変数取得
const mysql_user =  process.env.MYSQL_USER
const mysql_pass =  process.env.MYSQL_PASS

//定数connectionに、createConnectionを使って接続するデータベースの情報を格納します。
const connection = mysql.createConnection({
  host: 'localhost',
  user: mysql_user,
  password: mysql_pass ,　//実際にはパスワードが設定されています。
  port : 3306, 
  database: 'testdatabase'
});

// Post用のtestページ
app.get('/test', (req, res) => {
  res.render('test.ejs');
});

app.get('/top', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    (error, results) => {
      res.render('top.ejs',{userTable:results});
    }
  );
});

app.get('/editing/:id', (req, res) => {
  connection.query(
    'SELECT * FROM users WHERE id=?',
    [req.params.id],
    (error, results) => {
      //クエリ実行後の処理（アロー関数で）を記述
      res.render('editing.ejs',{userTable:results[0]});
    }
  );
});

// データベースに値を追加し、top.ejsのページに遷移する記述
app.post('/top', (req, res) => {
  connection.query(
      'INSERT INTO users(id,name) VALUES(?,?)',
      [req.body.addId,req.body.addName],
      (error,results)=>{
        connection.query(
          'SELECT * FROM users',
          (error, results) => {
            res.render('top.ejs',{userTable:results});
          }
        );
      }
    )
  });

app.post('/delete/:id', (req, res) => {
  // データベースのデータを削除する処理を書いてください
    connection.query(
      'DELETE FROM users WHERE id=?',
      [req.params.id],
      (error, results) => {
        res.redirect('/top');
    })
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE users SET name=? WHERE id = ?',
    [req.body.updateName,req.params.id],
     (error, results) => {
       res.redirect('/top');
   }
  )
});
app.listen(3000);

