const { Schema, model } = require("mongoose");

const projectSchema = new Schema ({
    title: String,
    description: String,
    technologies: String,
    url: String,
    image: String,
})

module.exports = model("Project", projectSchema);