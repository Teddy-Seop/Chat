"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoomService_1 = __importDefault(require("../Service/RoomService"));
const ChatService_1 = __importDefault(require("../Service/ChatService"));
const UserService_1 = __importDefault(require("../Service/UserService"));
class MainConroller {
    constructor() {
        this.router = express_1.default.Router();
        // login page rendering
        this.renderLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('login');
        });
        // signup page rendering
        this.renderSignup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('signup');
        });
        // room list page rendering
        this.renderRooms = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('rooms');
        });
        // get room list
        this.getRoomList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let roomList = yield this.roomService.getRoomList();
            res.json(roomList);
        });
        // get user count
        this.getUserCount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let count = yield this.roomService.getUserCount(req.query);
            res.json({ count: count });
        });
        // join chatting room
        this.renderChat = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let roomNo = req.params.no;
            let chat = yield this.chatService.getChatList(roomNo);
            let json = {
                roomNo: req.params.no,
                chat: JSON.stringify(chat),
                user: JSON.stringify(req.session.user)
            };
            res.render('chat', json);
        });
        this.renderUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let users = yield this.userService.getUserList(req.session.user);
            let frineds = yield this.userService.getFriendsList(req.session.user);
            res.render('users', {
                user: JSON.stringify(req.session.user),
                users: JSON.stringify(users),
                friends: JSON.stringify(frineds),
            });
        });
        this.renderFriends = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('friends');
        });
        this.roomService = new RoomService_1.default();
        this.chatService = new ChatService_1.default();
        this.userService = new UserService_1.default();
        this.initRouters();
    }
    initRouters() {
        this.router.get('/', this.renderLogin);
        this.router.get('/signup', this.renderSignup);
        this.router.get('/rooms', this.renderRooms);
        this.router.get('/roomList', this.getRoomList);
        this.router.get('/userCount', this.getUserCount);
        this.router.get('/room/:no', this.renderChat);
        this.router.get('/users', this.renderUsers);
        this.router.get('/friends', this.renderFriends);
    }
}
exports.default = MainConroller;
//# sourceMappingURL=MainController.js.map