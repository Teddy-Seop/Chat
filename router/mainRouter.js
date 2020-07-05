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

//회원가입 화면
router.get('/signup', (req, res) => {

    res.render('signup');
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

//DM 페이지
router.get('/dm/:uno/:fno', (req, res) => {
    if(req.session.uno != null){

        //DM room 존재 여부 확인
        var sql = `SELECT * FROM dm_room `;
        sql += `WHERE (uno1 = ${req.params.uno} AND uno2 = ${req.params.fno}) OR (uno1 = ${req.params.fno} AND uno2 = ${req.params.uno})`;
        connection.query(sql, (err, rows) => {
            if(err) throw err;

            if(rows[0] != null){
                //채팅 메시지 조회
                var sql1 = `SELECT * FROM dm_chat `;
                sql1 += `WHERE (uno = ${req.params.uno} AND fno = ${req.params.fno}) OR (uno = ${req.params.fno} AND fno = ${req.params.uno}) `;
                sql1 += `ORDER BY chat_time;`;
                //친구 정보 조회
                var sql2 = `SELECT * FROM user WHERE no = ${req.params.fno};`;
                //사용자 정보 조회
                var sql3 = `SELECT * FROM user WHERE no = ${req.params.uno};`;
                //db room 조회
                var sql4 = `SELECT * FROM dm_room WHERE (uno1 = ${req.params.uno} AND uno2 = ${req.params.fno}) OR (uno1 = ${req.params.fno} AND uno2 = ${req.params.uno});`
                connection.query(sql1 + sql2 + sql3 + sql4, (err, rows) => {
                    if(err) throw err;

                    var chat = JSON.stringify(rows[0]);
                    var fuser = JSON.stringify(rows[1][0]);
                    var user = JSON.stringify(rows[2][0])
                    var dm_room = JSON.stringify(rows[3][0]);
                    res.render('dm', {
                        chat: chat,
                        fuser: fuser,
                        user: user,
                        dm_room: dm_room
                    });
                })
            }else{
                var sql1 = `INSERT INTO dm_room (uno1, uno2) VALUES (${req.params.uno}, ${req.params.fno});`;
                connection.query(sql1, (err, rows) => {
                    if(err) throw err;

                    console.log('create');
                    res.redirect(`/dm/${req.params.uno}/${req.params.fno}`);
                })
            }
        })
    }else{
        res.redirect('/');
    }
})

module.exports = router;