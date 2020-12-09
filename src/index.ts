import { config } from 'chai';
import Express from 'express';

const app = Express();

const serverPort = process.env.SERVER_PORT || 3000;

app.listen(serverPort, () => console.log(`Server listening on port ${serverPort}`));
