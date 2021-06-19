const dotenv = require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client();

const handleSearch = async (message) => {
  let reply = "";
  await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${message}&key=AIzaSyDdhZFT8lTQJhI_YAruuX3Uys3CVYp2P_Y`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.items.forEach(
        (obj, index) => (reply += `${index + 1}) ` + obj.snippet.title + "\n")
      );
    });

  return reply;
};

client.on("ready", () => {
  console.log(`${client.user.tag} is ready`);
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (String(msg.content).includes("!find")) {
    const reply = await handleSearch(String(msg.content.replace("!find", "")));
    msg.channel.send(reply);
  }
});

client.login(process.env.TOKEN);
