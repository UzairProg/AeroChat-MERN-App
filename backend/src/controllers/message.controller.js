import User from "../models/User.js";
import Message from "../models/Messages.js";
import cloudinary from "../lib/cloudinary.js"; 

export const getAllContacts = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        // Exclude the logged-in user from the contacts list.. find all users where _id is not equal to loggedInUserId

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMessagesByUserId = async (req, res) =>{ // msgs between loggen in user and the id (user and a person)
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        if(!myId || !userToChatId) return res.status(400).json({ message: "Invalid user Id to chat" })
        
        const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: userToChatId },
            { senderId: userToChatId, receiverId: myId },
        ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) =>{
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const { id: receiverId } = req.params
        // console.log(senderId.toString(), receiverId, text, image);
        if (!text && !image) {
        return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.toString() === receiverId.toString()) {
        return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        if(!senderId || !receiverId) return res.status(400).json({ message: "Invalid user Id",senderId, receiverId })
        
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
        return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl = "";
        if (image) {
        // upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
        });

  await newMessage.save();

  // send a response so the client (Postman/front-end) doesn't keep waiting
  return res.status(201).json({ message: "Message sent successfully", data: newMessage });
        
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set( // to get unique ids.. in detail: map through all messages, for each message check if logged in user is sender or receiver, then get the other party's id
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),/* set means unique values.. and ...new means creating a new instance of the Set object */
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};