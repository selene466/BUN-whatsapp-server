module.exports = {
  apps: [
    {
      name: "BUN - whatsapp-server",
      port: "4140",
      exec_mode: "fork",
      instances: "1",
      script: "bun server.ts",
    },
  ],
};
