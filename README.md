# whatsapp-server

Ready to use WhatsApp server from WhatsApp Web API.

Thanks to:

- [@WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)
- [@bot-wa/bot-wa-baileys](https://github.com/andresayac/bot-wa-baileys)

## How to install

Clone this repo.

Install dependencies:

```sh
yarn
```

Copy `.env.example` to `.env` and set the values.

To run:

```bash
bun run server.ts
```

Default port is `4140`.

## API Docs

Login status:

```sh
curl -X GET http://localhost:4140/api/status
```

Send message:

```sh
curl -X GET
http://localhost:4140/api/send?phone_number=6285100001234&message=Hello%20World
```

Get login QR base64:

```sh
curl -X GET http://localhost:4140/api/get-qr
```

Get login QR image data URL:

```sh
curl -X GET http://localhost:4140/api/get-qr-image
```

Get login QR image PNG:

```sh
curl -X GET http://localhost:4140/api/get-qr-image-file
```

## Incoming Message Handler

Add your own handler in `whatsapp.ts`.

```node
// received message here
```
