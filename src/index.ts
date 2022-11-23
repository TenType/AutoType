import 'dotenv/config';

import Client from './structures/Client';
import keepAlive from './keep-alive';

const client = new Client();
client.start();

keepAlive();
