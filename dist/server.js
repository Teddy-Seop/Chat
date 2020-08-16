"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mainController_1 = __importDefault(require("./controller/mainController"));
const app = new app_1.default([
    {
        url: '/',
        object: new mainController_1.default()
    }
], 3000);
app.listen();
//# sourceMappingURL=server.js.map