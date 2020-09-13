// Requiring Discord Api
const Discord = require("discord.js");
const client = new Discord.Client();

//Getting the token bot
const { TOKEN, trustedPeople } = require("./config/config.json");

//trustedPeople is an array of the ids of the trusted people you are okay with using the bot

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.content.startsWith("```js")) {

    //Only give it to trusted people since im using eval() 
    if (trustedPeople.includes(msg.author.id)) {
      //Figuring out if the message is js code or not
      let stringCode = msg.content.split("```js")[1].split("```")[0];

      //Running the code from the message
      let realCode = await eval(stringCode);

      //Some error handling
      if (realCode == Error || undefined) {
        return;
      } else {
        //Sending the answer of the function
        msg.channel
          .send(realCode)

          //If the result doesnt run a function or doesnt return anything
          .catch((e) => {
            msg.channel
              .send(
                "Your Message doesnt run a function! And the function has to return something!"
              )
              .catch((e) => {
                console.log("How is this even gonna be an error tho");
              });
          });
      }
    } else{
      msg.channel.send('YOU ARE NOT A TRUSTED PERSON')
    }
  }
});

client.login(TOKEN);
