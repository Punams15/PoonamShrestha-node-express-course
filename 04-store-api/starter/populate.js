require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/Product');
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // remove old data
    await Product.deleteMany();

    // insert fresh data
    await Product.create(jsonProducts);

    console.log('SUCCESS ! Database populated/seeded');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
