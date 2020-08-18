import express from 'express';
import ChatService from '../Service/ChatService';

class ChatController {
    public router = express.Router();
    private chatService: ChatService;

    constructor() {
        this.chatService = new ChatService();
        this.initRouters();
    }

    private initRouters() {
        this.router.post('/insertMessage', this.insertMessage);
    }

    public insertMessage = async (req: express.Request, res: express.Response) => {
        this.chatService.insertMessage(req.body);
    }
}

export default ChatController;