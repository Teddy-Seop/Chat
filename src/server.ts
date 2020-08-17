import App from './app';
import MainController from './Controller/MainController';
import UserController from './Controller/UserController';

const app = new App(
    [
        {
            url: '/',
            object: new MainController()
        },
        {
            url: '/user',
            object: new UserController()
        }
    ],
    3000
)

app.listen();