import { create } from "@open-wa/wa-automate";
import { openai } from "./config/index.mjs";

create({
  sessionId: "GPT-3",
  multiDevice: false,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: "PT_BR",
  logConsole: false,
  popup: true,
  qrTimeout: 0,
}).then((client) => start(client));

function start(client) {
  var clientPhoneNumber = "0";
  client.getHostNumber().then((phoneNumber)=>{
    clientPhoneNumber = phoneNumber+'@c.us';
    console.log("Client Phone Number is " + phoneNumber);
    console.log("set clientPhoneNumber to " + clientPhoneNumber);
  });
  

  //Upon incoming message
  client.onMessage(async (message) => {
    const { body } = message;
    //console.log(message);
    console.log(client.getHostNumber())
    console.log("Incoming message")
    if (message.text.includes("\/image ")){//Image
      try {
        const response = await openai.createImage({
          prompt: message.text.replace("\/image ",""),
          n: 1,
          size: "256x256",
        });
        await client.sendFileFromUrl(message.from, response.data.data[0].url, "image.png", message.text.replace("\/image ","*openai:* "));
      } catch (error) {
        await client.reply(message.from, "*image:*\r"+error, message.id);
      }
    }
    
    if (message.text.includes("\/openai ")){//Text
      console.log(message.text.replace("\/openai ",""))
      console.log(message.notifyName)
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: message.text.replace("\/openai ",""),
          temperature: 0.5,
          max_tokens: 200,
        });
        await client.reply(message.from, "*openai:*\r"+completion.data.choices[0].text, message.id);
      } catch (error) {
        await client.reply(message.from, "*openai:*\r"+error, message.id);
      }
    }
  });
  //Upon any message
  client.onAnyMessage(async (message)  => {
    console.log(client.getHostNumber())
    if (message.from == clientPhoneNumber){
      console.log(message.from);
      if (message.text.includes("\/openai ")){//Text
        console.log(message)
        console.log(message.text.replace("\/openai ",""))
        console.log(message.notifyName)
        try {
          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message.text.replace("\/openai ",""),
            temperature: 0.5,
            max_tokens: 200,
          });
          await client.reply(message.to, "*openai:*\r"+completion.data.choices[0].text, message.id);
        } catch (error) {
          await client.reply(message.to, "*openai:*\r"+error, message.id);
        }
      }

      if (message.text.includes("\/image ")){//Image
        console.log(message.text.replace("\/image ",""))
        console.log(message.notifyName)
        try {
          const response = await openai.createImage({
            prompt: message.text.replace("\/image ",""),
            n: 1,
            size: "256x256",
          });
          await client.sendFileFromUrl(message.to, response.data.data[0].url, "image.png", message.text.replace("\/image ","*openai:* "));
        } catch (error) {
          await client.reply(message.to, "*image:*\r"+error, message.id);
        }
      }
    }
  });


  

}
