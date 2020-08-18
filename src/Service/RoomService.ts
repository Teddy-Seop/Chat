import userModel from '../Models/RoomModel';

class UserService {
    public getRoomList = async () => {
        let roomList = await userModel.findAll();

        return roomList;
    }
}

export default UserService;