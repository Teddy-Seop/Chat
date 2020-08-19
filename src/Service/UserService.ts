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

        return userInfo;
    }

    public createUser = async (json) => {
        await userModel.create(json);
    }

    public getUserList = async () => {
        let userList = await userModel.findAll({ raw: true });

        return userList;
    }

    public getFriendsList = async (json) => {
        let friendsList = await friendsModel.findAll({
            where: {
                userNo: json.no
            },
            raw: true
        });

        return friendsList;
    }

    public friending = async (json) => {
        // await = 
    }
}

export default UserService;