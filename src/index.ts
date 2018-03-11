import * as express from 'express';
import { defaultCors } from './apiConfig';
import { pool } from './persistance/pgPool';
import { ENV } from './common/enviromnent';
import { json, urlencoded } from 'body-parser';

// import * as  swaggerUi from 'swagger-ui-express';
// const swaggerDocument = require('./swagger.json');

const PORT = +(process.env.PORT || '8080');
const HOST_NAME = ENV == 'production' ? '0.0.0.0' : '127.0.0.1';

const app = express();
const router = express.Router();

router.use(defaultCors);
router.options('*', defaultCors);

router.route('/posts');

app.use(urlencoded({ extended: true }));
app.use(json);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

app.all('*', (req, res) => {
    return res.end('NOT FOUND');
});

app.get('/', (req, res) => {
    res.end('__daze_api__');
});

const server = app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening at http://${HOST_NAME}:${PORT}`);
});

