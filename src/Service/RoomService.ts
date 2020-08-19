import userModel from '../Models/RoomModel';
import roomUserListModel from '../Models/RoomUserListModel';

class UserService {
    public getRoomList = async () => {
        let roomList = await userModel.findAll();

        return roomList;
    }

    public insertUserList = async (json) => {
        await roomUserListModel.create(json);
    }

    public getUserList = async (json) => {
        let result = await roomUserListModel.findAll({
            where: {
                roomNo: json.roomNo
            },
            raw: true
        })

        return result;
    }

    public deleteUserList = async (json) => {
        await roomUserListModel.destroy({
            where: {
                userNo: json.userNo
            }
        })
    }
}

export default UserService;