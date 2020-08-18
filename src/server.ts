import App from './app';
import MainController from './Controller/MainController';
import UserController from './Controller/UserController';
import ChatController from './Controller/ChatController';

const app = new App(
    [
        {
            url: '/',
            object: new MainController()
        },
        {
            url: '/user',
            object: new UserController()
        },
        {
            url: '/chat',
            object: new ChatController()
        }
    ],
    3000
)

import http from 'http';
import socket from 'socket.io';
const server = http.createServer(app.app);
const io = socket(server);

io.on('connection', (socket) => {
    
    // 채팅방 입장
    socket.on('joinRoom', (data) => {
        socket.join(data.roomNo);

        // 입장 메시지 전송
        let message = `<div>${data.uid}님이 입장하였습니다.</div>`;
        io.to(data.roomNo).emit('message', message);
    })

    // 메시지 송수신
    socket.on('message', (data) => {
        let message = `<div>${data.uid}: ${data.msg}`;
        io.to(data.roomNo).emit('message', message);
    })

    // 채팅방 나가기
    socket.on('leaveRoom', (data) => {
        let message = `<div>${data.uid}님이 퇴장하였습니다.`;
        io.to(data.roomNo).emit('message', message)
    })
})

app.listen(server);