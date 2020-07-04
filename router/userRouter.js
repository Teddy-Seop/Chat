const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1111',
  port: '3306',
  database: 'chat',
  multipleStatements: true
})

//로그인 처리
router.post('/login', (req, res) => {
    
    //입력 id, pw 추출
    var id = req.body.id;
    var pw = req.body.pw;

    connection.query(`SELECT * FROM user WHERE id="${id}"`, (err, rows) => {
        if(err) throw err;

        //로그인 확인
        if(rows[0].id == id && rows[0].pw == pw){
            //login session 생성
            req.session.uno = rows[0].no;
            req.session.uid = rows[0].id;
            req.session.save(() => {
                res.redirect('/rooms');
            });
        }else{
            res.redirect('/');
        }
    })
})

module.exports = router;