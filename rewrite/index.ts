import * as express from 'express';

const PORT = 3000;
const HOST_NAME = 'localhost';

const app = express();

app.get('/', (request, response) => {
    response.end('HELLO THERE');
});

app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is listening at http://${HOST_NAME}:${PORT}`);
});

