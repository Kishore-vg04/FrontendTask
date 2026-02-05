const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const upload = require("../Middleware/upload");

const {
  register,
  login,
  fetch,
  update,
  changepw,
  viewall,
  postrequest,
  providehelp,
  getOrCreateChat,
  sendMessage,
  getMyChats,
  getChatById
} = require("../Controller/authController");

// Auth
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/fetch", auth, fetch);
router.put("/update", auth, update);
router.put("/changepw", auth, changepw);
router.get("/viewall", auth, viewall);

// Help
router.post("/postrequest", postrequest);
router.get("/providehelp", auth, providehelp);

// Chat (FINAL)
router.post("/chat", auth, getOrCreateChat);
router.post("/chat/send", auth, sendMessage);
router.get("/chat/my", auth, getMyChats);
router.get("/chat/:id", auth, getChatById);

module.exports = router;
