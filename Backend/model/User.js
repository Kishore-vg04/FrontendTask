const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  skill: String,
  image: { data: Buffer, contentType: String }
});

const coreSchema = new mongoose.Schema({
  name: String,
  email: String,
  problem: String
});

const chatSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model("User", userSchema),
  Core: mongoose.model("Core", coreSchema),
  Chat: mongoose.model("Chat", chatSchema)
};
