const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");
const keys = require("../config/keys");
const Twilio = require("twilio");

const messageSchema = new Schema({
	title: String,
	message: String,
	recipientPhone: Number,
	//timeZone: String,
	time: { type: Date },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
});

messageSchema.methods.requiresNotification = function (date) {
	const minutes = moment
		.duration(
			moment(this.time)
				//.tz(this.timeZone)
				.diff(moment(date))
		)
		.asMinutes();
	return Math.round(minutes) === 0;
};

messageSchema.statics.sendNotifications = function (callback) {
	// now
	const searchDate = new Date();
	Message.find().then(function (messages) {
		messages = messages.filter(function (messages) {
			return messages.requiresNotification(searchDate);
		});
		if (messages.length > 0) {
			console.log(messages);
			sendNotifications(messages);
		}
	});

	/**
	 * Send messages to all message owners via Twilio
	 * @param {array} messages List of messages.
	 */
	function sendNotifications(messages) {
		const client = new Twilio(keys.twilioSid, keys.twilioToken);
		messages.forEach(function (message) {
			// Create options to send the message
			const options = {
				to: `+1${message.recipientPhone}`,
				from: keys.twilioPhone,
				body: `${message.message}`,
			};

			// Send the message!
			client.messages.create(options, function (err, response) {
				if (err) {
					// Just log it for now
					console.error(err);
				}
			});
		});

		// Don't wait on success/failure, just indicate all messages have been
		// queued for delivery
		if (callback) {
			callback.call();
		}
	}
};

const Message = mongoose.model("messages", messageSchema);
module.exports = Message;
