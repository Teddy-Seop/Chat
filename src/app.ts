import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import Passport from './config/passport';
import path from 'path';

class App {
    public app: express.Applicaition = new express();
    public passportConfig: Passport = new Passport();

    constructor(controllers, public port: number) {
        this.initMiddlewares();
        this.initRouters(controllers);
    }

    private initRouters(controllers: any) {
        controllers.map((controller) => {
            this.app.use(controller.url, controller.object.router);
        })
    }

    private initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended : false }));
        this.app.use(session({
            secret:`@#@$MYSIGN#@$#$`,
            resave: false,
            saveUninitialized: true 
        }))
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.passportConfig.config();
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    public listen(server) {
        server.listen(this.port, () => {
            console.log(`Server is running on ${this.port}`);
        })
    }
}

export default App;