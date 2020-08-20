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
const sequelize_1 = require("sequelize");
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const FriendsModel_1 = __importDefault(require("../Models/FriendsModel"));
class UserService {
    constructor() {
        this.getUserInfo = (id) => __awaiter(this, void 0, void 0, function* () {
            let userInfo = yield UserModel_1.default.findOne({
                where: {
                    id: id
                }
            });
            return userInfo;
        });
        this.createUser = (json) => __awaiter(this, void 0, void 0, function* () {
            yield UserModel_1.default.create(json);
        });
        this.getUserList = (json) => __awaiter(this, void 0, void 0, function* () {
            try {
                let userList = yield UserModel_1.default.findAll({
                    where: {
                        no: { [sequelize_1.Op.ne]: json.no }
                    },
                    raw: true
                });
                return userList;
            }
            catch (e) {
                return e;
            }
        });
        this.getFriendsList = (json) => __awaiter(this, void 0, void 0, function* () {
            let friendsList = yield FriendsModel_1.default.findAll({
                where: {
                    userNo: json.no
                },
                raw: true
            });
            return friendsList;
        });
        this.friending = (json) => __awaiter(this, void 0, void 0, function* () {
            yield FriendsModel_1.default.create(json);
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map