const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
	title: String,
	message: String,
	recipientPhone: Number,
	_user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("messages", messageSchema);
