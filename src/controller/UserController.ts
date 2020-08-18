import express from 'express';
import UserService from '../Service/UserService';
import IUser from '../Interface/IUser';

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
    }

    login = async (req: express.Request, res: express.Response) => {
    
        let json = req.body;
        let userInfo = await this.userService.getUserInfo(json.id);
        
        if(userInfo.get('id') === json.id && userInfo.get('pw') === json.pw) {
            res.redirect('/rooms');
        } else {
            res.redirect('/');
        }
    }

    signup = async (req: express.Request, res: express.Response) => {
    
        let json = req.body;
        let userInfo = await this.userService.createUser(json);
        
        res.redirect('/');
    }

}

export default UserController;