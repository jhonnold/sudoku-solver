import express from 'express';
import cors from 'cors';
import bp from 'body-parser';
import compression from 'compression';
import Sudoku from './sudoku/index.js';

export const app = express();

app.set('view engine', 'ejs');
app.set('views', 'build/views');

app.use(cors());
app.use(bp.json());
app.use(compression());
app.use(express.static('build/public'));

app.use('/', (_, res) => res.render('pages/index'));
app.use('*path', (_, res) => res.redirect('/'));

const s = [
  '...9....6',
  '.5..239..',
  '......53.',
  '...67...1',
  '.8.....4.',
  '3...84...',
  '.68......',
  '..723..1.',
  '2....1...',
];

const v = new Sudoku(s.join(''));
v.solve();
console.log(v.toString());
