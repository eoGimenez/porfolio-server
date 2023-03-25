const { Schema, model } = require("mongoose");

const projectSchema = new Schema ({
    title: String,
    description: String,
    technologies: String,
    urlGit: String,
    image: String,
    linkedIn: {
        type: String,
        default:"https://www.linkedin.com/in/eogimenez/"
    }
})

module.exports = model("Project", projectSchema);