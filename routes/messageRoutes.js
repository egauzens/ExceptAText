const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Message = mongoose.model("messages");

module.exports = (app) => {
	app.get("/api/messages", requireLogin, async (req, res) => {
		const messages = await Message.find({ _user: req.user.id });

		res.send(messages);
	});

	app.post("/api/messages", async (req, res) => {
		console.log(req.body);

		const { title, message, recipientPhone } = req.body;

		const messageModel = new Message({
			title,
			message,
			recipientPhone,
			_user: req.user.id,
		});

		try {
			await messageModel.save();

			res.send(req.user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
