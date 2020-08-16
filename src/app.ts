import express from 'express';
import bodyParser from 'body-parser';

class App {
    public app: express.Applicaition = new express();
    
    constructor(controllers, public port: number) {
        this.initRouters(controllers);
        this.initMiddlewares();
    }

    private initRouters(controllers: any) {
        controllers.map((controller) => {
            this.app.use(controller.url, controller.object.router);
        })
    }

    private initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded( {extended : false } ));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on ${this.port}`);
        })
    }
}

export default App;