const mongoose = require("mongoose");
const mongoURI = `mongodb://localhost:27017/HUNGER-kiler`;

const foodItemSchema = new mongoose.Schema({
  CategoryName: String,
  name: String,
  img: String,
  options: [
    {
      description: String,
    },
  ],
});

const foodCategorySchema = new mongoose.Schema({
  categoryName: String,
});

const FoodItem = mongoose.model("food_items", foodItemSchema);
const FoodCategory = mongoose.model("food_category", foodCategorySchema);

const mongoDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");

      const allFoodItems = await FoodItem.find({}).exec();
      const allFoodCategory = await FoodCategory.find({}).exec();

      console.log("Fetched Data from food_items:", allFoodItems);
      console.log("Fetched Data from food_category:", allFoodCategory);

      global.FoodItem = allFoodItems;
      global.foodCategory = allFoodCategory;

      console.log("Data stored globally:", global.FoodItem, global.foodCategory);

      resolve(); // Resolve the promise to signal that the data is ready
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      reject(error); // Reject the promise with the error
    }
  });
};

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  });
});

module.exports = mongoDB;
