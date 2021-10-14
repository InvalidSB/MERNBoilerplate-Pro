import mongoose from "mongoose";

const connectDB = async () => {
  const connection = await mongoose.connect(
   
    "mongodb+srv://sujan:me@demo.v7gqo.mongodb.net/DemoDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
  console.log(`MongoDB Connected: ${connection.connection.host}`);
};

export default connectDB;
