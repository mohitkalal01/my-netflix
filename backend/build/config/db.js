const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectOptions = {
      // Mongoose 6.x and later do not require useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex.
      // These options are deprecated and can be removed.
    };
    const conn = await mongoose.connect(process.env.MONGO_URI, connectOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
