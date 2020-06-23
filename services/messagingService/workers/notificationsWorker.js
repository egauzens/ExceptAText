const Message = require("../../../models/Message");

const notificationWorkerFactory = function () {
	return {
		run: function () {
			Message.sendNotifications();
		},
	};
};

module.exports = notificationWorkerFactory();
