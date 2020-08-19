import express from 'express';
import ChatService from '../Service/ChatService';
import RoomService from '../Service/RoomService';

class ChatController {
    public router = express.Router();
    private chatService: ChatService;
    private roomService: RoomService;

    constructor() {
        this.chatService = new ChatService();
        this.roomService = new RoomService();
        this.initRouters();
    }

    private initRouters() {
        this.router.post('/message', this.insertMessage);
        this.router.get('/userList', this.getUserList);
        this.router.post('/userList', this.insertUserList);
        this.router.delete('/userList', this.deleteUserList);
    }

    public insertMessage = async (req: express.Request, res: express.Response) => {
        await this.chatService.insertMessage(req.body);
    }

    public getUserList = async (req: express.Request, res: express.Response) => {
        let json = {
            where: {
                roomNo: req.query.roomNo
            }
        }
        let userList = await this.roomService.getUserList(json);

        res.json(userList);
    }

    public insertUserList = async (req: express.Request, res: express.Response) => {
        await this.roomService.insertUserList(req.body);
        
        res.json({result: 'OK'});
    }

    public deleteUserList = async (req: express.Request, res: express.Response) => {
        await this.roomService.deleteUserList(req.body);

        res.json({result: 'OK'});
    }
}

export default ChatController;