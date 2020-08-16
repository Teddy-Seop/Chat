import express from 'express';

class mainConroller {
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', this.test);
    }

    test = (req: express.Request, res: express.Response) => {
        res.send('test');
    }
}

export default mainConroller;