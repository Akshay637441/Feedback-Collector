const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://kpakshay2005_db_user:Akshay2005@cluster0.0f2bbuw.mongodb.net/?appName=Cluster0")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err);
});

// Feedback Schema

const feedbackSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Feedback = mongoose.model(
    "Feedback",
    feedbackSchema
);

app.get("/", (req, res) => {
    res.send("Feedback Collector Backend Running");
});

app.post("/addFeedback", async (req, res) => {

    try {

        const feedback = new Feedback({
            name: req.body.name,
            message: req.body.message,
            rating: req.body.rating
        });

        await feedback.save();

        res.status(201).json({
            message: "Feedback Submitted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.get("/feedbacks", async (req, res) => {

    try {

        const feedbacks = await Feedback.find()
        .sort({ createdAt: -1 });

        res.json(feedbacks);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.delete("/feedback/:id", async (req, res) => {

    try {

        await Feedback.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Feedback Deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});