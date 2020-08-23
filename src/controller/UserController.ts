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
        this.router.post('/login', passport.authenticate('local', {
            successRedirect: '/rooms',
            failureRedirect: '/'
        })),
        this.router.post('/signup', this.signup);
        this.router.get('/user', this.getUserInfo);
        this.router.get('/friendsList', this.getFrinedsList);
        this.router.post('/friends', this.friending);
        this.router.post('/friends/accept', this.accept);
        this.router.delete('/friends/reject', this.reject);
    }

    signup = async (req: express.Request, res: express.Response) => {
        let json = req.body;
        await this.userService.createUser(json);
        
        res.redirect('/');
    }

    getUserInfo = async (req: express.Request, res: express.Response) => {
        let json = req.query;
        let userInfo: User = await this.userService.getUserInfo(json)

        res.json(userInfo);
    }

    getFrinedsList = async (req: express.Request, res: express.Response) => {
        let json = {
            no: req.query.no,
            check: 1
        }
        let frinedsList: User[] = await this.userService.getFriendsList(json);

        res.json(frinedsList);
    }

    friending = async (req: express.Request, res: express.Response) => {
        await this.userService.friending(req.body);

        res.json({ result: 'OK' });
    }

    accept = async (req: express.Request, res: express.Response) => {
        await this.userService.accpet(req.body);

        res.json({ result: 'OK' });
    }

    reject = async (req: express.Request, res: express.Response) => {
        await this.userService.reject(req.body);

        res.json({ result: 'OK' });
    }
}

export default UserController;