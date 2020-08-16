"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class mainConroller {
    constructor() {
        this.router = express_1.default.Router();
        this.test = (req, res) => {
            res.send('test');
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.test);
    }
}
exports.default = mainConroller;
//# sourceMappingURL=mainController.js.map