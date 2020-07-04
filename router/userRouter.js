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

//친구 요청
router.post('/friending', (req, res) => {
    console.log(req.body);
    var sql = `INSERT INTO friending (uno, uid, fno) VALUES (${req.body.uno}, "${req.body.uid}", ${req.body.fno})`;
    connection.query(sql, (err, rows) => {
        if(err) throw err;

        res.send('OK');
    })
})

//친구 요청 수락
router.post('/friending/accept', (req, res) => {
    console.log(req.body);
    var sql1 = `INSERT INTO friends (uno, fno) VALUES (${req.body.uno}, ${req.body.fno});`;
    var sql2 = `INSERT INTO friends (uno, fno) VALUES (${req.body.fno}, ${req.body.uno});`
    var sql3 = `DELETE FROM friending WHERE uno = ${req.body.fno} AND fno = ${req.body.uno};`;
    connection.query(sql1 + sql2 + sql3, (err, rows) => {
        if(err) throw err;

        res.send({result: 'result'});
    })
})

//친구 요청 거절
router.post('/friending/reject', (req, res) => {
    console.log(req.body);
    var sql1 = `DELETE FROM friending WHERE uno = ${req.body.fno} AND fno = ${req.body.uno};`;
    connection.query(sql1, (err, rows) => {
        if(err) throw err;

        res.send({result: 'result'});
    })
})

//유저 리스트
router.get('/userList', (req, res) => {
    var data = req.query.data;
    data = data.map(Number); //배열 값을 string에서 number로 형변환
    var sql = `SELECT * FROM user WHERE no in (?)`;
    connection.query(sql, [data], (err, rows) => {
        if(err) throw err;
        
        res.send(rows);
    })
})

//친구 리스트
// router.get('/friendsList', (req, res) => {
//     var data = req.query;
//     console.log(data);
//     //data = data.map(Number); //배열 값을 string에서 number로 형변환
//     var sql = `SELECT * FROM friends WHERE uno = ${data.uno}`;
//     connection.query(sql, [data], (err, rows) => {
//         if(err) throw err;
        
//         res.send(rows);
//     })
// })

module.exports = router;