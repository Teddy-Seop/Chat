const express = require('express');
const session = require('express-session');
const http = require('http');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socket(server);
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    port: '3306',
    database: 'chat',
    multipleStatements: true
})

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(express.urlencoded( {extended : false } ));
app.set('view engine', 'ejs');
app.use(session({
    secret:`@#@$MYSIGN#@$#$`,
    resave: false,
    saveUninitialized: true 
}))

const userRouter = require('./router/userRouter');
const mainRouter = require('./router/mainRouter');
app.use('/user', userRouter);
app.use('/', mainRouter);

io.on('connection', (socket) => {
    console.log('connect');

    /* room chat start */
    //채팅방 입장
    socket.on('joinRoom', (data) => {
        console.log(data);

        //방 입장
        socket.join(data.rno);

        //채팅방 유저 목록 삽입 조회 쿼리
        var sql1 = `INSERT INTO room_userList (rno, uno, uid) VALUES (${data.rno}, ${data.uno}, "${data.uid}");`;
        var sql2 = `SELECT * FROM room_userList WHERE rno = ${data.rno};`;
        connection.query(sql1 + sql2, (err, rows) => {
           if(err) throw err;
           
           console.log(rows[1]);
           //입장 메시지 전송
           var msg = `<div>${rows[1][rows[1].length - 1].uid}님이 입장하였습니다.</div>`;
           io.to(data.rno).emit('message', msg);

           //유저 목록 전송
           io.to(data.rno).emit('userList', rows[1]);
        })
    })

    //메시지 송수신
    socket.on('message', (data) => {
        console.log(data);
        data = JSON.parse(data);
        var msg = `<div>${data.uid} : ${data.msg}</div>`;
        
        var sql = `INSERT INTO chat (msg, uno, uid, rno) VALUES ("${data.msg}", ${data.uno}, "${data.uid}", ${data.rno});`;
        connection.query(sql, (err, rows) => {
            if(err) throw err;

            io.to(data.rno).emit('message', msg);
        })
    })

    //채팅방 나가기
    socket.on('leaveRoom', (data) => {
        console.log(data);
        var sql1 = `DELETE FROM room_userList WHERE rno = ${data.rno} AND uno = ${data.uno};`;
        var sql2 = `SELECT * FROM room_userList WHERE rno = ${data.rno};`;
        connection.query(sql1 + sql2, (err, rows) => {
            if(err) throw err;
            //퇴장 메시지 전송
            var msg = `<div>${data.uid}님이 퇴장하였습니다.`
            io.to(data.rno).emit('message', msg);
            
            //유저 목록 전송
           io.to(data.rno).emit('userList', rows[1]);
        })
    })
    /* room chat end */

    /* dm chat start */
    //DM 입장
    socket.on('dm', (data) => {
        //DM 입장
        socket.join(data);
    })

    //DM메시지 송수신
    socket.on('dm_message', (data) => {
        console.log(data);
        data = JSON.parse(data);
        var msg = `<div>${data.uid} : ${data.msg}</div>`;
        
        var sql = `INSERT INTO dm_chat (uno, fno, uid, msg) VALUES (${data.uno}, ${data.fno}, "${data.uid}", "${data.msg}");`;
        connection.query(sql, (err, rows) => {
            if(err) throw err;

            io.to(data.dm_room_no).emit('dm_message', msg);
        })
    })
    /* dm chat end */

    //연결 종료
    socket.on('disconnect', () => {
        console.log('disconnect');
    })
})

server.listen(3000, () => {
    console.log('express is running on 3000');
})