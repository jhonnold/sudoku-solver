import express from 'express';
import cors from 'cors';
import bp from 'body-parser';
import compression from 'compression';

export const app = express();

app.set('view engine', 'ejs');
app.set('views', 'build/views');

app.use(cors());
app.use(bp.json());
app.use(compression());
app.use(express.static('build/public'));

app.use('/', (_, res) => res.render('pages/index'));
app.use('*path', (_, res) => res.redirect('/'));
