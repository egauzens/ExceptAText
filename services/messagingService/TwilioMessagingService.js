const mongoose = require("mongoose");
const moment = require("moment");
const keys = require("../../config/keys");
const twilio = require("twilio");
const CronJob = require("cron").CronJob;
const client = new twilio(keys.twilioSid, keys.twilioToken);

require("../../models/Message");
const Message = mongoose.model("messages");

class TwilioMessagingService {
	start() {
		new CronJob(
			"00 * * * * *",
			() => {
				console.log(
					"Running Send Notifications Worker for " + moment().format()
				);
				this.sendNotifications();
			},
			null,
			true,
			""
		);
	}

	sendNotifications() {
		// now
		const searchDate = new Date();
		Message.find().then((messages) => {
			messages = messages.filter((message) => {
				return requiresNotification(message.time, searchDate);
			});
			if (messages.length > 0) {
				console.log(messages);
				sendNotifications(messages);
			}
		});

		function requiresNotification(time, date) {
			const minutes = moment
				.duration(
					moment(time)
						//.tz(this.timeZone)
						.diff(moment(date))
				)
				.asMinutes();
			return Math.round(minutes) === 0;
		}

		/**
		 * Send messages to all message owners via Twilio
		 * @param {array} messages List of messages.
		 */
		function sendNotifications(messages) {
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
		}
	}
}

module.exports = TwilioMessagingService;
