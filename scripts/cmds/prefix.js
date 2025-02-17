const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "prefix2",
		version: "1.0",
		author: "Kylepogi", // Do not remove the author's name.
		countDown: 5,
		role: 0,
		shortDescription: "prefix",
		longDescription: "view commands",
		category: "bot prefix",
	},
	onStart: async function () {},

	onChat: async function ({ event, message, getLang }) {
		const manilaTime = moment.tz('Asia/Manila');
		const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

		if (event.body && event.body.toLowerCase() === "prefix") {
			// Countdown to a specific date (June 18, 2025)
			const targetDate = Date.parse("June 18, 2025, 00:00:00");
			const currentTime = Date.parse(new Date());
			const t = targetDate - currentTime;

			const seconds = Math.floor((t / 1000) % 60);
			const minutes = Math.floor((t / 1000 / 60) % 60);
			const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			const days = Math.floor(t / (1000 * 60 * 60 * 24));

			return message.reply({
				body: `   𓃵 『𝗞𝗬𝗟𝗘'𝗦 𝗕𝗢𝗧』\n━━━━━━━━━━━━━━━━━━\n
           𝗠𝗬 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗦: [ . ]\n
𝚃𝚢𝚙𝚎  .𝚑𝚎𝚕𝚙 𝚘𝚛 .𝚑𝚎𝚕𝚙𝚊𝚕𝚕 𝚝𝚘 𝚟𝚒𝚎𝚠 𝚖𝚢 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜:>\n
━━━━━━━━━━━━━━━━━━\n
📅 | ⏰ Date And Time: ${formattedDateTime}\n
⏳ Countdown to June 18, 2025:\n
   ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds remaining`,
				attachment: await global.utils.getStreamFromURL("https://i.imgur.com/YIMFTHy.jpeg")
			});
		}
	}
};
