const { User, Core, Chat } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- REGISTER ---
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, skill } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Enter all credentials" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role, skill });

    if (req.file) {
      newUser.image.data = req.file.buffer;
      newUser.image.contentType = req.file.mimetype;
    }

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- FETCH CURRENT USER ---
exports.fetch = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentUser = await User.findById(userId).select("-password");
    if (!currentUser) return res.status(404).json({ message: "User not found" });

    const userObj = currentUser.toObject();
    if (userObj.image?.data) {
      userObj.image = `data:${userObj.image.contentType};base64,${userObj.image.data.toString("base64")}`;
    } else userObj.image = null;

    res.status(200).json(userObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- VIEW ALL USERS ---
exports.viewall = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- CORE HELP ---
exports.postrequest = async (req, res) => {
  try {
    const { name, email, problem } = req.body;
    if (!name || !email || !problem) return res.status(400).json({ message: "Enter Details" });

    const newUser = new Core({ name, email, problem });
    await newUser.save();
    res.status(201).json({ message: "Problem Delivered Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.providehelp = async (req, res) => {
  try {
    const users = await Core.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrCreateChat = async (req, res) => {
  try {
    const myId = req.user.id;
    const { otherUserId } = req.body;

    let chat = await Chat.findOne({
      participants: { $all: [myId, otherUserId] }
    }).populate("participants", "name email");

    if (!chat) {
      chat = await Chat.create({
        participants: [myId, otherUserId],
        messages: []
      });
      chat = await chat.populate("participants", "name email");
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.sendMessage = async (req, res) => {
  try {
    const { chatId, text } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    chat.messages.push({
      sender: req.user.id,
      text
    });

    await chat.save();

    const updatedChat = await Chat.findById(chatId)
      .populate("participants", "name email");

    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyChats = async (req, res) => {
  try {
    const myId = req.user.id;

    const chats = await Chat.find({
      participants: myId
    })
      .sort({ updatedAt: -1 })
      .populate("participants", "name email");

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getChatById = async (req, res) => {
  const chat = await Chat.findById(req.params.id)
    .populate("participants", "name email");

  if (!chat) return res.status(404).json({ message: "Chat not found" });

  res.json(chat);
};


// update user profile
exports.update = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        skill: req.body.skill,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// change password
exports.changepw = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
