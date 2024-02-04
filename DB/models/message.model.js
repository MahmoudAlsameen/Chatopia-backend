import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: function() {
        return (this.file === undefined && this.picture === undefined)
      },
    },
    picture: {
      type: String,
      required: function() {
        return (this.file === undefined && this.text === undefined)
      }
    },
    file: {
      type: String,
      required: function() {
        return (this.text === undefined && this.picture === undefined)
      },
    },
  }
)



const messageModel = mongoose.model("Message", messageSchema);
export default messageModel
