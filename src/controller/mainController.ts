import express from 'express';
import RoomService from '../Service/RoomService';
import ChatService from '../Service/ChatService';
import UserService from '../Service/UserService';
import User from '../Models/UserModel';
import Chat from '../Models/ChatModel';
import Friends from '../Models/FriendsModel'
import Room from '../Models/RoomModel';

class MainConroller {
    public router = express.Router();
    private roomService: RoomService;
    private chatService: ChatService;
    private userService: UserService;

    constructor() {
        this.roomService = new RoomService();
        this.chatService = new ChatService();
        this.userService = new UserService();
        this.initRouters();
    }

    private initRouters() {
        this.router.get('/', this.renderLogin);
        this.router.get('/signup', this.renderSignup);
        this.router.get('/rooms', this.renderRooms);
        this.router.get('/roomList', this.getRoomList);
        this.router.get('/userCount', this.getUserCount);
        this.router.get('/room/:no', this.renderChat);
        this.router.get('/users', this.renderUsers);
        this.router.get('/friends', this.renderFriends);
    }

    // login page rendering
    renderLogin = async (req: express.Request, res: express.Response) => {
        res.render('login');
    }

    // signup page rendering
    renderSignup = async (req: express.Request, res: express.Response) => {
        res.render('signup');
    }

    // room list page rendering
    renderRooms = async (req: express.Request, res: express.Response) => {
        res.render('rooms');
    }

    // get room list
    getRoomList = async (req: express.Request, res: express.Response) => {
        let roomList: Room[] = await this.roomService.getRoomList();
        
        res.json(roomList);
    }

    // get user count
    getUserCount = async (req: express.Request, res: express.Response) => {
        let count: number = await this.roomService.getUserCount(req.query);
        
        res.json({ count: count });
    }

    // join chatting room
    renderChat = async (req: express.Request, res: express.Response) => {
        let roomNo: number = req.params.no;
        let chat: Chat[] = await this.chatService.getChatList(roomNo);
        
        let json = {
            roomNo: req.params.no,
            chat: JSON.stringify(chat),
            user: JSON.stringify(req.session.user)
        }
        
        res.render('chat', json);
    }

    renderUsers = async (req: express.Request, res: express.Response) => {
        let users: User[] = await this.userService.getUserList(req.session.user);
        let frineds: Friends[] = await this.userService.getFriendsList(req.session.user);

        res.render('users', {
            user: JSON.stringify(req.session.user),
            users: JSON.stringify(users),
            friends: JSON.stringify(frineds),
        });
    }

    renderFriends = async (req: express.Request, res: express.Response) => {
        res.render('friends');
    }
}

export default MainConroller;