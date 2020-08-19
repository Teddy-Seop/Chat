"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
class App {
    constructor(controllers, port) {
        this.port = port;
        this.app = new express_1.default();
        this.initMiddlewares();
        this.initRouters(controllers);
    }
    initRouters(controllers) {
        controllers.map((controller) => {
            this.app.use(controller.url, controller.object.router);
        });
    }
    initMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.set('views', path_1.default.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        this.app.use(express_session_1.default({
            secret: `@#@$MYSIGN#@$#$`,
            resave: false,
            saveUninitialized: true
        }));
    }
    listen(server) {
        server.listen(this.port, () => {
            console.log(`Server is running on ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map