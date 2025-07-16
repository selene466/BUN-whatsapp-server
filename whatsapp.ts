import { BaileysClass } from "@bot-wa/bot-wa-baileys";
import axios from "axios";
import fs from "fs";

axios.defaults.validateStatus = (status) => status >= 200 && status <= 500;

const botBaileys = new BaileysClass({});

const botSessionPath = "./bot_sessions";

const init = () => {
  botBaileys.on("auth_failure", async (error) =>
    console.log("ERROR BOT: ", error),
  );
  botBaileys.on("qr", (qr) => {
    if (!fs.existsSync(botSessionPath)) {
      fs.mkdirSync("./bot_sessions/", { recursive: true });
    }

    if (!fs.existsSync(`${botSessionPath}/qr.txt`)) {
      fs.writeFileSync(`${botSessionPath}/qr.txt`, qr);
    }

    console.log("NEW QR CODE:", qr);
  });
  botBaileys.on("ready", async () => {
    fs.writeFileSync(`${botSessionPath}/qr.txt`, "");

    console.log("READY BOT");
  });

  botBaileys.on("message", async (message) => {
    const phone_number = message.from.split("@")[0];
    if (phone_number.includes("-")) return;
    const phone_name = message.pushName || null;

    console.log(phone_name);
    console.log(message.body);
    // logic: if [id_pickup] pickup
    // logic: if [id_pickup] done
    // logic: if send image with caption [id_pickup] done
    // logic: if reply image with caption [id_pickup] done
  });
};
init();

export const sendMessage = async (phone: string, message: string) => {
  await botBaileys.sendText(phone, message);
};

export const botRestart = () => {
  botBaileys.clearSessionAndRestart();
};
