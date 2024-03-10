import mongoose, {Schema} from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  created: Date,
  banned: Schema.Types.Mixed,
  wins: Number,
  losses: Number,
  draws: Number,
  currency: Number,
  badges: [String]
})

export default mongoose.models.User || mongoose.model('User', UserSchema);