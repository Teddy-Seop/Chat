import express from 'express';
import UserService from '../Service/UserService';

class UserController {
    public router = express.Router();
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.initRouters();
    }

    private initRouters() {
        this.router.post('/login', this.login);
        this.router.post('/signup', this.signup);
        this.router.get('/friendsCount', this.getFrinedsCount);
    }

    login = async (req: express.Request, res: express.Response) => {
    
        let json = req.body;
        let userInfo = await this.userService.getUserInfo(json.id);

        if(userInfo.get('id') === json.id && userInfo.get('pw') === json.pw) {
            req.session.user = userInfo;

            res.redirect('/rooms');
        } else {
            res.redirect('/');
        }
    }

    signup = async (req: express.Request, res: express.Response) => {
    
        let json = req.body;
        await this.userService.createUser(json);
        
        res.redirect('/');
    }

    getFrinedsCount = async (req: express.Request, res: express.Response) => {
    
        let frinedsList = await this.userService.getFriendsList(req.query);
        let count: number = frinedsList.length;

        res.json({ count: count });
    }

    friending = async (req: express.Request, res: express.Response) => {
    
        await this.userService.friending(req.body);

        res.json({ result: 'OK' });
    }

}

export default UserController;