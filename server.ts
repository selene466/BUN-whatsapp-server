import { sendMessage } from "./whatsapp";
import fs from "fs";

Bun.serve({
  routes: {
    "/api/status": new Response("OK"),

    "/api/send": {
      GET: () => new Response("List posts"),
      POST: async (req) => {
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

    "/api/*": Response.json({ message: "Not found" }, { status: 404 }),
  },

  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});
