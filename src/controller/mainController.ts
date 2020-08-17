import express from 'express';
import RoomService from '../Service/RoomService';

class MainConroller {
    public router = express.Router();
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
        this.initRouters();
    }

    private initRouters() {
        this.router.get('/', this.renderLogin);
        this.router.get('/signup', this.renderSignup);
        this.router.get('/rooms', this.renderRooms);
        this.router.get('/roomList', this.getRoomList);
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
}

export default MainConroller;