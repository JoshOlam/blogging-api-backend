const mongoose = require('mongoose');
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  },
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log('MongoDB connected...');
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
