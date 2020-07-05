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

//초기 화면
router.get('/', (req, res) => {

    res.render('login');
})

//채팅방 목록
router.get('/rooms', (req, res) => {

    if(req.session.uno != null){
        var sql = `SELECT r.no, count(ul.rno) as cnt FROM room as r `;
        sql += `LEFT JOIN room_userlist as ul `;
        sql += `ON r.no = ul.rno `;
        sql += `GROUP BY r.no;`;
        connection.query(sql, (err, rows) => {
            if(err) throw err;
            
            var rooms = JSON.stringify(rows);
            res.render('rooms', {rooms: rooms});
        })
    }else{
        res.redirect('/')
    }
})

//채팅
router.get('/chat/:no', (req, res) => {
    if(req.session.uno != null){
        
        var query = `SELECT * FROM chat WHERE rno = ${req.params.no} ORDER BY no`;
        connection.query(query, (err, rows) => {
            //해당 채팅방에 저장된 채팅 조회
            var list = new Array();
            for(var i=0; i<rows.length; i++){
                var data = new Object();
                data = rows[i];
                list.push(data);
            }
            //로그인한 유저 정보
            var user = {
                uno: req.session.uno,
                uid: req.session.uid
            }
            res.render('chat', {
                rno: req.params.no,
                chat: JSON.stringify(list),
                user: JSON.stringify(user)
            });
        })
    }else{
       res.redirect('/');
    }
})

//유저 목록 페이지
router.get('/users', (req, res) => {

    if(req.session.uno != null){
        var sql1 = `SELECT user.no, user.id, user.signup_date, count(friends.fno) as cnt `; 
        sql1 += `FROM user `;
        sql1 += 'LEFT JOIN friends ';
        sql1 += `ON user.no = friends.uno `;
        sql1 += `WHERE user.no != ${req.session.uno} `;
        sql1 += `GROUP BY user.no;`;
        sql2 = `SELECT * FROM friends WHERE uno = ${req.session.uno};`;
        connection.query(sql1 + sql2, (err, rows) => {
            if(err) throw err;

            //로그인한 유저 정보
            var user = {
                uno: req.session.uno,
                uid: req.session.uid
            }
            console.log(rows[0]);
            var users = JSON.stringify(rows[0]); //전체 사용자
            var friends = JSON.stringify(rows[1]); //친추가된 사용자
            res.render('users', {
                users: users,
                user: user,
                friends: friends
            });
        })
    }else{
        res.redirect('/');
    }
})

//친구 목록 페이지
router.get('/friends', (req, res) => {
    if(req.session.uno != null){
        var sql1 = `SELECT * FROM friending WHERE fno = ${req.session.uno};`;
        var sql2 = `SELECT * FROM friends WHERE uno = ${req.session.uno};`;
        connection.query(sql1 + sql2, (err, rows) => {
            if(err) throw err;

            var friending = JSON.stringify(rows[0]);
            var friends = JSON.stringify(rows[1]);
            res.render('friends', {
                uno: req.session.uno,
                friending: friending,
                friends: friends
            });
        })
    }else{
        res.redirect('/');
    }
})

module.exports = router;