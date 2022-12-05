// dependency
const mongoose = require('mongoose');
const databaseConnection = () => {
    // database connection here
    const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS}@cluster0.yzpku.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log("DB Error = ", err)
    })
}
module.exports = { databaseConnection }