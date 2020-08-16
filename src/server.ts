import App from './app';
import mainController from './controller/mainController';

const app = new App(
    [
        {
            url: '/',
            object: new mainController()
        }
    ],
    3000
)

app.listen();