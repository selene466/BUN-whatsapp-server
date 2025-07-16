import { BaileysClass } from "@bot-wa/bot-wa-baileys";
import axios from "axios";

axios.defaults.validateStatus = (status) => status >= 200 && status <= 500;

const botBaileys = new BaileysClass({});

function init() {
  botBaileys.on("auth_failure", async (error) =>
    console.log("ERROR BOT: ", error),
  );
  botBaileys.on("qr", (qr) => console.log("NEW QR CODE: ", qr));
  botBaileys.on("ready", async () => console.log("READY BOT"));

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
}
init();

export const sendWa = async (phone: string, message: string) => {
  await botBaileys.sendText(phone, message);
};
