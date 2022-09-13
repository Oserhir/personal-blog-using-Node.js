const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async (next) => {
  // console.log('user about to be created & saved', this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
