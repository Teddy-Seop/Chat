import userModel from '../Models/RoomModel';
import roomUserListModel from '../Models/RoomUserListModel';

class RoomService {
    public getRoomList = async () => {
        let roomList = await userModel.findAll();

        return roomList;
    }

    public getUserCount = async (json) => {
        let count = await roomUserListModel.count({
            where: {
                roomNo: json.roomNo
            }
        })

        return count;
    }

    public insertUserList = async (json) => {
        await roomUserListModel.create(json);
    }

    public getUserList = async (json) => {
        let result = await roomUserListModel.findAll(json);

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

export default RoomService;