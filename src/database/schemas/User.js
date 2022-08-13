import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  discriminator: {
    type: String,
    required: true,
  },
  avatar: { // Avatar ID. The URL can be assembled https://cdn.discordapp.com/avatars/USER_ID/AVATAR_ID.webp?size=XXX.
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
