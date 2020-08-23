import { Op } from "sequelize";
import userModel from '../Models/UserModel';
import friendsModel from '../Models/FriendsModel';

class UserService {
    public getUserInfo = async (json) => {
        let userInfo = await userModel.findOne({
            where: {
                no: json.no
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

    public accpet = async (json) => {
        await friendsModel.update({
            check: 1
        },
        {
            where: {
                userNo: json.userNo,
                friendsNo: json.friendsNo
            }
        });
        await friendsModel.create({
            userNo: json.friendsNo,
            friendsNo: json.userNo,
            check: 1
        })
    }

    public reject = async (json) => {
        await friendsModel.destroy({
            where: {
                userNo: json.userNo,
                friendsNo: json.friendsNo
            }
        });
    }
}

export default UserService;