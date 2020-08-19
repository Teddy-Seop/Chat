import Chat from '../Models/ChatModel';

class ChatService {
    public getChatList = async (roomNo) => {
        console.log(roomNo)
        let result = await Chat.findAll({
            where: {
                roomNo: roomNo
            },
            order: [
                ['no', 'ASC']
            ],
            raw: true
        })

        return result;
    }

    public insertMessage = async (json) => {
        await Chat.create(json);
    }

}

export default ChatService;