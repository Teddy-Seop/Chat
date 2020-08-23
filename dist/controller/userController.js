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
const passport_1 = __importDefault(require("passport"));
const UserService_1 = __importDefault(require("../Service/UserService"));
class UserController {
    constructor() {
        this.router = express_1.default.Router();
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let json = req.body;
            yield this.userService.createUser(json);
            res.redirect('/');
        });
        this.getUserInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let json = req.query;
            let userInfo = yield this.userService.getUserInfo(json);
            res.json(userInfo);
        });
        this.getFrinedsList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let json = {
                no: req.query.no,
                check: 1
            };
            let frinedsList = yield this.userService.getFriendsList(json);
            res.json(frinedsList);
        });
        this.friending = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.userService.friending(req.body);
            res.json({ result: 'OK' });
        });
        this.accept = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.userService.accpet(req.body);
            res.json({ result: 'OK' });
        });
        this.reject = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.userService.reject(req.body);
            res.json({ result: 'OK' });
        });
        this.userService = new UserService_1.default();
        this.initRouters();
    }
    initRouters() {
        this.router.post('/login', passport_1.default.authenticate('local', {
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
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map