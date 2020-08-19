"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const MainController_1 = __importDefault(require("./Controller/MainController"));
const UserController_1 = __importDefault(require("./Controller/UserController"));
const ChatController_1 = __importDefault(require("./Controller/ChatController"));
const app = new app_1.default([
    {
        url: '/',
        object: new MainController_1.default()
    },
    {
        url: '/user',
        object: new UserController_1.default()
    },
    {
        url: '/chat',
        object: new ChatController_1.default()
    }
], 3000);
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const server = http_1.default.createServer(app.app);
const io = socket_io_1.default(server);
io.on('connection', (socket) => {
    // 채팅방 입장
    socket.on('joinRoom', (data) => {
        socket.join(data.roomNo);
        // 입장 메시지 전송
        let message = `<div>${data.uid}님이 입장하였습니다.</div>`;
        io.to(data.roomNo).emit('message', message);
        io.to(data.roomNo).emit('userList', data);
    });
    // 메시지 송수신
    socket.on('message', (data) => {
        let message = `<div>${data.uid}: ${data.msg}`;
        io.to(data.roomNo).emit('message', message);
    });
    // 채팅방 나가기
    socket.on('leaveRoom', (data) => {
        let message = `<div>${data.uid}님이 퇴장하였습니다.`;
        io.to(data.roomNo).emit('message', message);
        io.to(data.roomNo).emit('userList', data);
    });
});
app.listen(server);
//# sourceMappingURL=server.js.map