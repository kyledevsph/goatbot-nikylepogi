const moment = require("moment-timezone");
const axios = require("axios");

const manilaTime = moment().tz("Asia/Manila");
const formattedDateTime = manilaTime.format("MMMM D, YYYY h:mm A");

const KylepogiPrefix = [".ai", "ai", "Ai", "bot", "ask"];

module.exports = {
  config: {
    name: "ai",
    version: "7.11",
    role: 0,
    category: "AI",
    author: "Kylepogi",//api by sandipniqqa
    shortDescription: "ai assistant",
    longDescription: "gpt ai cmd for goatbot",
  },

  onStart: async function () {},

  onChat: async function ({ message, event, args, api, threadID, messageID }) {
    try {
      const ahprefix = KylepogiPrefix.find(
        (p) => event.body && event.body.toLowerCase().startsWith(p)
      );
      if (!ahprefix) return;

      const kylepogi = event.body.substring(ahprefix.length).trim();
      if (!kylepogi) {
        await message.reply("❗ 𝗔𝗰𝗰𝗲𝘀𝘀 𝗗𝗲𝗻𝗶𝗲𝗱.\nMissing question");
        return;
      }

      const responses = [
        "Hi, I am 𝗔𝗶  𝗒𝗈𝗎𝗋 𝖺𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝖼𝖾 𝖼𝗁𝖺𝗍𝗀𝗉𝗍 developed by Kylepogi (Kyle Bait-it). How can I help you today?",
        "How can I help you?",
        "How can I assist you today?",
        "How can I help you? 🙂",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      if (args.length > 0 && args[0].toLowerCase() === "hi") {
        message.reply(randomResponse);
        return;
      }

      if (args.length === 0) {
        message.reply("ℹ️ Please provide a question.");
        return;
      }

      const encodedPrompt = encodeURIComponent(args.join(" "));
      await message.reply("🔍 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍 𝖺 𝗆𝗂𝗇𝗎𝗍𝖾...");

  const response = await axios.get(
        `https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`
      );

      if (response.data && response.data.answer) {
        message.reply(response.data.answer);
      } else {
        message.reply("⛔ 𝗔𝗰𝗰𝗲𝘀𝘀 𝗗𝗲𝗻𝗶𝗲𝗱.\nSorry, I couldn't process your request.");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      message.reply("An error occurred while processing your request.");
    }
  },
};
