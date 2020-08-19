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
const ChatService_1 = __importDefault(require("../Service/ChatService"));
const RoomService_1 = __importDefault(require("../Service/RoomService"));
class ChatController {
    constructor() {
        this.router = express_1.default.Router();
        this.insertMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.chatService.insertMessage(req.body);
        });
        this.getUserList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let userList = yield this.roomService.getUserList(req.query);
            res.json(userList);
        });
        this.insertUserList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.roomService.insertUserList(req.body);
            res.json({ result: 'OK' });
        });
        this.deleteUserList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.roomService.deleteUserList(req.body);
            res.json({ result: 'OK' });
        });
        this.chatService = new ChatService_1.default();
        this.roomService = new RoomService_1.default();
        this.initRouters();
    }
    initRouters() {
        this.router.post('/message', this.insertMessage);
        this.router.get('/userList', this.getUserList);
        this.router.post('/userList', this.insertUserList);
        this.router.delete('/userList', this.deleteUserList);
    }
}
exports.default = ChatController;
//# sourceMappingURL=ChatController.js.map