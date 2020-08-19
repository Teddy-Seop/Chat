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
const RoomModel_1 = __importDefault(require("../Models/RoomModel"));
const RoomUserListModel_1 = __importDefault(require("../Models/RoomUserListModel"));
class UserService {
    constructor() {
        this.getRoomList = () => __awaiter(this, void 0, void 0, function* () {
            let roomList = yield RoomModel_1.default.findAll();
            return roomList;
        });
        this.insertUserList = (json) => __awaiter(this, void 0, void 0, function* () {
            yield RoomUserListModel_1.default.create(json);
        });
        this.getUserList = (json) => __awaiter(this, void 0, void 0, function* () {
            let result = yield RoomUserListModel_1.default.findAll({
                where: {
                    roomNo: json.roomNo
                },
                raw: true
            });
            return result;
        });
        this.deleteUserList = (json) => __awaiter(this, void 0, void 0, function* () {
            yield RoomUserListModel_1.default.destroy({
                where: {
                    userNo: json.userNo
                }
            });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=RoomService.js.map