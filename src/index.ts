import * as express from 'express';
import { defaultCors } from './apiConfig';
import postRouter from './api/postRouter';
import tagRouter from './api/tagRouter';
import skillRouter from './api/skillRouter';
import projectRouter from './api/projectRouter';

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

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
    res.end('NOT IMPLEMENTED');
};

app.post("/api/login/", NOT_IMPLEMENTED);

app.use('/api/post', postRouter);
app.use('/api/tag', tagRouter);
app.use('/api/skill', skillRouter);
app.use('/api/project', projectRouter);

app.all('*', (req, res) => {
    return res.end('NOT FOUND')
});

const server = app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening at http://${HOST_NAME}:${PORT}`);
});

