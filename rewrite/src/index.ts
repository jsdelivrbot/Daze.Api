import * as express from 'express';
import { defaultCors } from './apiConfig';

const env = process.env.NODE_ENV;

const PORT = +(process.env.PORT || '8080');
const HOST_NAME = env == 'production' ? '0.0.0.0' : '127.0.0.1';

const app = express();
const router = express.Router();

router.use(defaultCors);
router.options('*', defaultCors);

app.get('/', (request, response) => {
    response.end('__daze_api__');
});

const NOT_IMPLEMENTED = (request: express.Request, response: express.Response) => {
    response.end('NOT IMPLEMENTED');
};


app.post("/api/login/", NOT_IMPLEMENTED);
app.get("/api/post/", NOT_IMPLEMENTED);

app.get("/api/post/%i", NOT_IMPLEMENTED);
app.get("/api/post/slug/%s", NOT_IMPLEMENTED);
app.get("/api/post/%i/tag", NOT_IMPLEMENTED);
app.get("/api/post/%i/%i", NOT_IMPLEMENTED);
app.head("/api/post/%i", NOT_IMPLEMENTED);
app.options("/api/post/", NOT_IMPLEMENTED);

app.get("/api/tag/", NOT_IMPLEMENTED);
app.get("/api/tag/%i", NOT_IMPLEMENTED);
app.get("/api/tag/%i/%i", NOT_IMPLEMENTED);
app.head("/api/tag/%i", NOT_IMPLEMENTED);
app.options("/api/tag/", NOT_IMPLEMENTED);

app.get("/api/skill/", NOT_IMPLEMENTED);
app.get("/api/skill/%i", NOT_IMPLEMENTED);
app.head("/api/skill/%i", NOT_IMPLEMENTED);
app.options("/api/skill/", NOT_IMPLEMENTED);

app.get("/api/project/", NOT_IMPLEMENTED);
app.get("/api/project/%i", NOT_IMPLEMENTED);
app.head("/api/project/%i", NOT_IMPLEMENTED);
app.options("/api/project/", NOT_IMPLEMENTED);

const server = app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening at http://${HOST_NAME}:${PORT}`);
});

