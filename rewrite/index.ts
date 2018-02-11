import * as express from 'express';
import { defaultCors } from './apiConfig';

const env = process.env.NODE_ENV;

const PORT = process.env.PORT || '8080';
const HOST_NAME = env == 'production' ? '0.0.0.0' : '127.0.0.1';

const app = express();
const router = express.Router();

router.use(defaultCors);
router.options('*', defaultCors);

app.get('/', (request, response) => {
    response.end('HELLO WORLD');
});

app.listen(+PORT, HOST_NAME, () => {
    console.log(`Server is listening at http://${HOST_NAME}:${PORT}`);
});



