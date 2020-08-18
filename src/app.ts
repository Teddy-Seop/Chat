import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

class App {
    public app: express.Applicaition = new express();

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
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
    }

    public listen(server) {
        server.listen(this.port, () => {
            console.log(`Server is running on ${this.port}`);
        })
    }
}

export default App;