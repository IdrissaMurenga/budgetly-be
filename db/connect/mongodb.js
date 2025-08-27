import mongoose from "mongoose";
import { seedCategories } from "../../utils/seedCtegory.js";

export const mongoDBConnect = (app) => {
    const mongodb_uri = process.env.MONGODB_URI

    mongoose.connect(mongodb_uri)
        .then(async () => {
            const port = process.env.PORT
            await seedCategories()
            app.listen(port, ()=> console.log(`Server is running at http://localhost:${port}......`))
        })
        .catch(error => console.error("MongoDB connection error:", error))
}