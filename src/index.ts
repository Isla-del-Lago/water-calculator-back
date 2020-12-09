import Express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();

const serverPort = process.env.SERVER_PORT || 3000;

app.listen(serverPort, () => console.log(`Server listening on port ${serverPort}`));
