import { Op } from "sequelize";
import userModel from '../Models/UserModel';
import friendsModel from '../Models/FriendsModel';

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

    public getUserList = async (json) => {
        try {
            let userList = await userModel.findAll({
                where: {
                    no: { [Op.ne]: json.no }
                },
                raw: true
            });
    
            return userList;
        } catch(e) {
            return e;
        }
    }

    public getFriendsList = async (json) => {
        let friendsList = await friendsModel.findAll({
            where: {
                userNo: json.no,
                check: json.check
            },
            raw: true
        });

        return friendsList;
    }

    public friending = async (json) => {
        await friendsModel.create(json);
    }
}

export default UserService;