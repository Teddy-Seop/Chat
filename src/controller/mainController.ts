import express from 'express';
import RoomService from '../Service/RoomService';
import ChatService from '../Service/ChatService';

class MainConroller {
    public router = express.Router();
    private roomService: RoomService;
    private chatService: ChatService;

    constructor() {
        this.roomService = new RoomService();
        this.chatService = new ChatService();
        this.initRouters();
    }

    private initRouters() {
        this.router.get('/', this.renderLogin);
        this.router.get('/signup', this.renderSignup);
        this.router.get('/rooms', this.renderRooms);
        this.router.get('/roomList', this.getRoomList);
        this.router.get('/room/:no', this.renderChat)
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
        let roomList = await this.roomService.getRoomList();
        
        res.json(roomList);
    }

    // join chatting room
    renderChat = async (req: express.Request, res: express.Response) => {
        let roomNo = req.params.no;
        let chat = await this.chatService.getChatList(roomNo);
        let user  = {
            userNo: 1,
            uid: 'test'
        }
        let json = {
            roomNo: req.params.no,
            chat: JSON.stringify(chat),
            user: JSON.stringify(user)
        }
        
        res.render('chat', json);
    }
}

export default MainConroller;