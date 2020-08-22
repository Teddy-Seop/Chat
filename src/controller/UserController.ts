import express from 'express';
import passport from 'passport';
import UserService from '../Service/UserService';
import User from '../Models/UserModel';

class UserController {
    public router = express.Router();
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.initRouters();
    }

    private initRouters() {
        // this.router.post('/login', this.login);
        this.router.post('/login', passport.authenticate('local', {
            successRedirect: '/rooms',
            failureRedirect: '/'
        })),
        this.router.post('/signup', this.signup);
        this.router.get('/friendsList', this.getFrinedsList);
        this.router.post('/friends', this.friending);
    }

    login = async (req: express.Request, res: express.Response) => {
    
        let json = req.body;
        let userInfo: User = await this.userService.getUserInfo(json.id);

        if(userInfo.get('id') === json.id && userInfo.get('pw') === json.pw) {
            req.user = userInfo;

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

    getFrinedsList = async (req: express.Request, res: express.Response) => {
        let json = {
            no: req.query.no,
            check: 1
        }
        console.log(json)
        let frinedsList: User[] = await this.userService.getFriendsList(json);

        res.json(frinedsList);
    }

    friending = async (req: express.Request, res: express.Response) => {
        await this.userService.friending(req.body);

        res.json({ result: 'OK' });
    }
}

export default UserController;