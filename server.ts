import { botRestart, sendMessage } from "./whatsapp";
import fs from "fs";
import QRCode from "qrcode";

Bun.serve({
  port: process.env.PORT || 4140,
  routes: {
    "/api/status": () => {
      let loginStatus = "logout";
      const qr = fs.readFileSync("./bot_sessions/qr.txt", "utf8");

      if (qr === "") {
        loginStatus = "login";
      }

      return Response.json({ status: "OK", login_status: loginStatus });
    },

    "/api/send": {
      GET: async (req) => {
        const url = new URL(req.url);
        const phone_number = url.searchParams.get("phone_number");
        const message = url.searchParams.get("message");

        if (!message || !phone_number) {
          return new Response("Invalid Parameters", { status: 422 });
        }

        await sendMessage(phone_number.toString(), message.toString());

        return Response.json({ status: "OK" });
      },
    },

    "/api/get-qr": {
      GET: () => {
        let qr = "";
        try {
          qr = fs.readFileSync("./bot_sessions/qr.txt", "utf8");
          return Response.json({ status: "OK", qr });
        } catch (error) {
          console.log("Failed to read QR");
          return Response.json({ status: "Error" });
        }
      },
    },

    "/api/get-qr-image": {
      GET: async () => {
        try {
          const qr = fs.readFileSync("./bot_sessions/qr.txt", "utf8");
          return new Response(await QRCode.toDataURL(qr));
        } catch (error) {
          console.log("Failed to read QR");
          return Response.json({ status: "Error" });
        }
      },
    },

    "/api/get-qr-image-file": {
      GET: async () => {
        try {
          const qr = fs.readFileSync("./bot_sessions/qr.txt", "utf8");
          await QRCode.toFile("./bot_sessions/qr.png", qr);

          const qrImage = fs.readFileSync("./bot_sessions/qr.png");

          return new Response(qrImage as unknown as Uint8Array, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
            },
          });
        } catch (error) {
          console.log("Failed to read QR");
          return Response.json({ status: "Error" });
        }
      },
    },

    "/api/restart": {
      GET: async () => {
        botRestart();
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return Response.json({ status: "OK" });
      },
    },

    "/api/*": Response.json({ message: "Not found" }, { status: 404 }),
  },

  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});
