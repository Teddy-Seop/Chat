"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const MainController_1 = __importDefault(require("./Controller/MainController"));
const UserController_1 = __importDefault(require("./Controller/UserController"));
const app = new app_1.default([
    {
        url: '/',
        object: new MainController_1.default()
    },
    {
        url: '/user',
        object: new UserController_1.default()
    }
], 3000);
app.listen();
//# sourceMappingURL=server.js.map