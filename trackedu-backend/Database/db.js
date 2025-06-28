const mongoose = require('mongoose');

const connection = async () => {
  const url = 'mongodb://localhost:27017/Website_Edu'; // name your database here

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Local MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

module.exports = connection;

//0TnMeYx0II11aS7s
//janjuasoban71