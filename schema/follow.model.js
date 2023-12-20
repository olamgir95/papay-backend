const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema(
  {
    follow_id: { type: Schema.Types.ObjectId, required: true },
    subscriber_id: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true },
  { versionKey: false }
);

followSchema.index({ follow_id: 1, subscriber_id: 1 }, { unique: true });

module.exports = mongoose.model("Follow", followSchema);
