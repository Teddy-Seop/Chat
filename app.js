const express = require('express');
const session = require('express-session');
const http = require('http');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const mysql = require('mysql');
const { rawListeners } = require('process');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    port: '3306',
    database: 'chat',
    multipleStatements: true
})

app.use(bodyParser.json());
app.use(express.urlencoded( {extended : false } ));
app.set('view engine', 'ejs');
app.use(session({
    secret:`@#@$MYSIGN#@$#$`,
    resave: false,
    saveUninitialized: true 
}))

//초기 화면
app.get('/', (req, res) => {

    res.render('login');
})

//로그인 처리
app.post('/login', (req, res) => {
    
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
                res.redirect('rooms');
            });
        }else{
            res.redirect('/');
        }
    })
})

//채팅방 목록
app.get('/rooms', (req, res) => {

    if(req.session.uno != null){
        connection.query(`SELECT * FROM room`, (err, rows) => {
            if(err) throw err;
            
            //존재하는 채팅방 추출
            var list = new Array();
            for(var i=0; i<rows.length; i++){
                
                list.push(rows[i].no);
            }
            var rooms = JSON.stringify(list);
            res.render('rooms', {rooms: rooms});
        })
    }else{
        res.redirect('/')
    }
})

//채팅
app.get('/chat/:no', (req, res) => {
    //if(req.session.uno != null){
        
        var query = `SELECT * FROM chat WHERE rno = ${req.params.no} ORDER BY no`;
        connection.query(query, (err, rows) => {
            //해당 채팅방에 저장된 채팅 조회
            var list = new Array();
            for(var i=0; i<rows.length; i++){
                var data = new Object();
                data = rows[i];
                list.push(data);
            }
            //유저 정보
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
    //}else{
    //    res.redirect('/');
    //}
})

io.on('connection', (socket) => {
    console.log('connect');

    //채팅방 입장
    socket.on('joinRoom', (data) => {
        console.log(data);

        //채팅방 유저 목록 삽입 조회 쿼리
        var sql1 = `INSERT INTO room_userList (rno, uno, uid) VALUES (${data.rno}, ${data.uno}, "${data.uid}");`;
        var sql2 = `SELECT * FROM room_userList WHERE rno = ${data.rno};`;
        connection.query(sql1 + sql2, (err, rows) => {
           if(err) throw err;
           
           console.log(rows[1]);
           var msg = `<div>${rows[1][rows[1].length - 1].uid}님이 입장하였습니다.</div>`;
           io.emit('message', msg);
        })
    })

    //메시지 송수신
    socket.on('message', (data) => {
        console.log(data);
        data = JSON.parse(data);
        var msg = `<div>${data.uid} : ${data.msg}</div>`;
        io.emit('message', msg);
    })

    //채팅방 나가기
    socket.on('leaveRoom', (data) => {

        var sql = `DELETE FROM room_userList WHERE rno = ${data.rno}, uno = ${data.uno};`;
        connection.query(sql, (err, rows) => {
            var msg = `<div>${data.uid}님이 퇴장하였습니다.`
            io.emit('message', msg);
        })
    })

    //연결 종료
    socket.on('disconnect', () => {
        console.log('disconnect');
    })
})

// io.sockets.on('connect', (socket) => {
//     var room;

//     console.log('user connect');

//     socket.on('message', (data) => {
//         console.log(data);
//         // var sql = `INSERT INTO message (message, type, user_no, channel_no)
//         //             VALUES ("${data.message}", 0, ${data.uno}, ${data.channel});`;
//         // connection.query(sql, (err, rows) => {
//         //   if(err) throw err;
//         //   console.log(rows);
//         // })
//         io.sockets.in(room).emit('message', data);
//     })

//     socket.on('joinRoom', (num, name) => {
//         room = num;
//         console.log(`${name} is join ${room}`);
//         socket.join(room);
//     });

//     socket.on('leaveRoom', (num, name) => {
//         socket.leave(num, () => {
//           console.log(name + ' leave a ' + num);
//         });
//     });

//     socket.on('disconnect', () => {
//         console.log(`${socket.name} is disconnected`);
//         socket.broadcast.emit('update', {
//             type: 'disconnect',
//             name: 'SERVER',
//             message: `${socket.name} is disconnected`
//         });
//     })
// })

server.listen(3000, () => {
    console.log('express is running on 3000');
})