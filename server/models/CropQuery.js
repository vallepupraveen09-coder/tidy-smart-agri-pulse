import mongoose from 'mongoose'

const cropQuerySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  moduleType: { type: String, enum: ['price', 'disease', 'guide', 'pesticide', 'voice', 'store', 'weather'] },
  query: { type: String },
  result: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('CropQuery', cropQuerySchema)
