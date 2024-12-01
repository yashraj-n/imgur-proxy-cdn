import { AutoRouter, json } from 'itty-router';

// Enviroment variables which are in the wrangler.toml file
export interface Env {
	HOMEPAGE_URL: string;
	IMGUR_AUTH_KEY: string;
}

const router = AutoRouter();

const withAuthMiddleware = (req: Request, env: Env) => {
	const authorization = req.headers.get('Authorization');

	// Checking if the request has the correct authorization key
	if (!authorization || authorization !== 'Bearer ' + env.IMGUR_AUTH_KEY) {
		return new Response('Unauthorized', { status: 401 });
	}
};

// Redirecting to the homepage, change in Enviroment variables
router.get('/', (req, env: Env) => new Response(null, { status: 302, headers: { Location: env.HOMEPAGE_URL } }));

router.post('/api/upload', withAuthMiddleware, async (req) => {
	// Getting the authorization key from the request headers
	const authorization = req.headers.get('Authorization');
	const formData = await req.formData();

	// Uploading the image to Imgur, requires the authorization key
	return fetch('https://api.imgur.com/3/image', {
		method: 'POST',
		headers: {
			Authorization: `Client-ID ${authorization}`,
		},
		body: formData,
	});
});

router.get('/config/sharex', withAuthMiddleware, async (req) => {
	const authorization = req.headers.get('Authorization');
	const domain = new URL(req.url).origin;

	// source: https://getsharex.com/docs/custom-uploader
	const config = {
		Version: '14.0.0',
		Name: 'Imgur Custom Domain Uploader for domain ' + domain,
		DestinationType: 'ImageUploader, FileUploader',
		RequestMethod: 'POST',
		RequestURL: `${domain}/api/upload`,
		Body: 'MultipartFormData',
		FileFormName: 'image',
		// Getting .data.id from the response of the Imgur API
		URL: `${domain}/{json:data.id}`,
		Headers: {
			Authorization: authorization,
		},
	};
	return json(config);
});

router.get('/:id', async (req) => {
	// Fetching the image from Imgur
	return fetch(`https://i.imgur.com/${req.params.id}.png`);
});

export default router;
