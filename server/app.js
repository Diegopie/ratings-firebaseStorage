import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import router from './routes/index.js';
import 'dotenv/config.js';

const app = express();
const PORT = process.env.PORT || '5090';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false }));

app.use(router);


ViteExpress.listen(app, PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
