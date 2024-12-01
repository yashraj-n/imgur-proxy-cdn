
<div align="center">

# 🎨 Imgur Proxy CDN


**Imgur Proxy CDN** is a lightweight and scalable API tool built on Cloudflare Workers that enables users to upload images to Imgur and serve them via their custom domain as a CDN.

![JavaScript Badge](https://img.shields.io/static/v1?label=Language&message=JavaScript&color=orange&style=flat-square)
![License Badge: MIT](https://img.shields.io/static/v1?label=License&message=MIT&color=blue&style=flat-square)

</div>

---

## Features

- **Cloudflare Workers Powered**: High performance, scalability, and low latency.
- **Imgur Integration**: Direct image uploads to Imgur via API.
- **Custom CDN**: Use your own domain to serve images instead of default Imgur URLs.
- **ShareX Compatibility**: Fully integrates with ShareX for seamless uploads.
- **Secure Authentication**: Uses bearer token for secure API access.
- **Easy Deployment**: Lightweight and straightforward setup with configurable environment variables.

---

## Deployment

### Deploy with One Click
You can deploy this project to Cloudflare Workers by clicking the button below and following the instructions.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yashraj-n/imgur-proxy-cdn)

---

### Manual Deployment

1. Clone this repository and install dependencies:

   ```bash
   git clone https://github.com/yashraj-n/imgur-proxy-cdn.git
   cd imgur-proxy-cdn
   npm install
   ```

2. Edit the `wrangler.toml` file to add your Imgur `Client ID`:

   ```toml
   IMGUR_AUTH_KEY="YOUR_IMGUR_CLIENT_ID"
   ```

3. Build and deploy the project using the Cloudflare Workers CLI:

   ```bash
   wrangler deploy
   ```

4. Add your custom domain in the [Cloudflare Workers dashboard](https://dash.cloudflare.com). Navigate to your worker's **Settings**, go to **Domains & Routes**, and click on `+ Add`.

---

## Configuration

### Setting Up Imgur API

1. Log in to your Imgur account and create a new application [here](https://api.imgur.com/oauth2/addclient). Use the following settings:
   - Application Name: (Any name of your choice)
   - Authorization Type: `OAuth 2 authorization without a callback URL`
   - Fill in the remaining fields as required.

   Once created, you’ll receive your `Client ID` and `Client Secret`. Keep these credentials safe.

![Imgur API Example](https://lambda.yashraj.eu.org/81g1RlZ)

### Configuring Cloudflare Environment

1. If using the **Deploy to Cloudflare Workers** button, navigate to **Settings → Variables & Secrets** in your worker’s dashboard.
2. Add a new secret with the key `IMGUR_AUTH_KEY` and set the value as your Imgur `Client ID`.

---

### Setting Up ShareX

1. Use the following command to generate a ShareX configuration file:

   ```bash
   curl "https://<YOUR-CUSTOM-DOMAIN>/config/sharex" -H "Authorization: Bearer <CLIENT-ID>" > ShareXConfig.sxcu
   ```

   Replace `<YOUR-CUSTOM-DOMAIN>` with your custom domain and `<CLIENT-ID>` with your Imgur `Client ID`.

2. Double-click on the generated `ShareXConfig.sxcu` file to open it in ShareX. Click **Import** to finalize the setup.

---


## API Routes

### `POST /upload`
- **Description**: Upload an image to Imgur and retrieve a URL using your custom domain as the CDN.
- **Headers**:
  - `Authorization: Bearer <CLIENT-ID>`
  - `Content-Type: multipart/form-data`
- **Form Data**:
  - `image` (required): Path to the image file to upload.

- **Example**:
  ```bash
  curl --request POST \
    --url https://<YOUR-CUSTOM-DOMAIN>/upload \
    --header 'Authorization: Bearer <CLIENT-ID>' \
    --header 'content-type: multipart/form-data' \
    --form 'image=@/path/to/your/image.jpg'
  ```

- **Response**:
  - `200 OK`: Returns the custom CDN URL of the uploaded image.
  - `401 Unauthorized`: If the authorization token is missing or invalid.
  - `400 Bad Request`: If the image is missing or invalid.

---

### `GET /config/sharex`
- **Description**: Generate a ShareX configuration file for the custom domain.
- **Headers**:
  - `Authorization: Bearer <CLIENT-ID>`
- **Response**:
  - `200 OK`: Returns a `.sxcu` configuration file for ShareX.
  - `401 Unauthorized`: If the authorization token is missing or invalid.

### `GET /{imageId}`
- **Description**: Retrieve the image from Imgur using the uploaded image's ID, served through your custom domain.
- **Path Parameters**:
  - `imageId` (required): The unique identifier for the uploaded image.

- **Example**:
  ```bash
  curl --request GET \
    --url https://<YOUR-CUSTOM-DOMAIN>/<IMAGE-ID> \
    --header 'Authorization: Bearer <CLIENT-ID>'
  ```

- **Response**:
  - `200 OK`: Returns the image file from the custom domain.
  - `404 Not Found`: If the image with the specified `imageId` does not exist.
  - `401 Unauthorized`: If the authorization
---


## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).


