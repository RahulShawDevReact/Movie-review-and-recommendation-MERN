const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // Enable SSL/TLS
    tlsAllowInvalidCertificates: true, // Validate SSL certificate
});
const connection = mongoose.connection;
connection.on("connected", () => {
    console.log("Mongo DB connected successfully");
});
connection.on("error", (err) => {
    console.log("Mongo DB not connected ", err);
});
