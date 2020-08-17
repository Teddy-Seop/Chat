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
const RoomService_1 = __importDefault(require("../Service/RoomService"));
class MainConroller {
    constructor() {
        this.router = express_1.default.Router();
        // login page rendering
        this.renderLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('login');
        });
        // signup page rendering
        this.renderSignup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('signup');
        });
        // room list page rendering
        this.renderRooms = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render('rooms');
        });
        // get room list
        this.getRoomList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let roomList = yield this.roomService.getRoomList();
            res.json(roomList);
        });
        this.roomService = new RoomService_1.default();
        this.initRouters();
    }
    initRouters() {
        this.router.get('/', this.renderLogin);
        this.router.get('/signup', this.renderSignup);
        this.router.get('/rooms', this.renderRooms);
        this.router.get('/roomList', this.getRoomList);
    }
}
exports.default = MainConroller;
//# sourceMappingURL=MainController.js.map