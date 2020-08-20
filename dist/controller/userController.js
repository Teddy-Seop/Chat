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
const UserService_1 = __importDefault(require("../Service/UserService"));
class UserController {
    constructor() {
        this.router = express_1.default.Router();
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let json = req.body;
            let userInfo = yield this.userService.getUserInfo(json.id);
            if (userInfo.get('id') === json.id && userInfo.get('pw') === json.pw) {
                req.session.user = userInfo;
                res.redirect('/rooms');
            }
            else {
                res.redirect('/');
            }
        });
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let json = req.body;
            yield this.userService.createUser(json);
            res.redirect('/');
        });
        this.getFrinedsCount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let frinedsList = yield this.userService.getFriendsList(req.query);
            let count = frinedsList.length;
            res.json({ count: count });
        });
        this.friending = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.userService.friending(req.body);
            res.json({ result: 'OK' });
        });
        this.userService = new UserService_1.default();
        this.initRouters();
    }
    initRouters() {
        this.router.post('/login', this.login);
        this.router.post('/signup', this.signup);
        this.router.get('/friendsCount', this.getFrinedsCount);
        this.router.post('/friends', this.friending);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map