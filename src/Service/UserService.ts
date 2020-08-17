import { Service, Inject } from 'typedi';
import "reflect-metadata";
import userModel from '../Models/UserModel';
import friendsModel from '../Models/FriendsModel';

@Service()
class UserService {
    public getUserInfo = async (id: string) => {
        let userInfo = await userModel.findOne({
            where: {
                id: id
            }
        })

        return userInfo
    }

    public createUser = async (json) => {
        await userModel.create(json);
    }
}

export default UserService;