const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	secDescription: { type: String, required: true },
	technologies: [String],
	urlGit: { type: String, required: true },
	image: { type: String, required: true },
	linkedIn: {
		type: String,
		default: 'https://www.linkedin.com/in/eogimenez/',
	},
});

module.exports = model('Project', projectSchema);
