const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", required: true 
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Done"], // optional validation
      default: "Open",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Task', taskSchema);