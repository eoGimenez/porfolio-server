const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	secDescription: { type: String, required: true },
	technologies: [{ type: String, required: true }],
	urlGit: { type: String, required: true },
	image: { type: String, required: true },
});

module.exports = model('Project', projectSchema);
