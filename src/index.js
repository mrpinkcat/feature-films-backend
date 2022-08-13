import { config } from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import discordStrategy from './strategies/discord.js';
import routes from './routes/index.js';
import store from 'connect-mongo';
import './database/index.js';

config();

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: store.create({
    mongoUrl: process.env.MONGODB_URI,
  })
}));

// Enable passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(discordStrategy);

app.use('/', routes);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
