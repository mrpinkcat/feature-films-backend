import { config } from 'dotenv';
import passport from 'passport';
import { Strategy } from 'passport-discord';
import User from './../database/schemas/User.js';

config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return user ? done(null, user) : done(null, null);
  } catch (error) {
    return done(error, null);
  }
});

export default new Strategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'guilds'],
  },
  async (accessToken, refreshToken, profile, done) => {
    if (profile.guilds.find(guild => guild.id === process.env.DISCORD_GUILD_ID)) {

      try {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const user = await User.findOneAndUpdate({ discordId: profile.id }, {
          username: profile.username,
          discriminator: profile.discriminator,
          avatar: profile.avatar,
          token,
        });
        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create({
            discordId: profile.id,
            username: profile.username,
            discriminator: profile.discriminator,
            avatar: profile.avatar,
            token,
          });
          return done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
    } else {
      return done(null, false);
    }
  }
);