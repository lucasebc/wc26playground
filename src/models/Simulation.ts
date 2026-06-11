import mongoose, { Schema } from 'mongoose';

const SimulationSchema = new Schema({
  shareCode: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 30 }, // 30 days TTL
});

export const SimulationModel =
  mongoose.models.Simulation ||
  mongoose.model('Simulation', SimulationSchema);
