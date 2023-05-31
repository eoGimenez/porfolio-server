const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	secDescription: { type: String, required: true },
	technologies: [{ type: String, required: true }],
	urlGit: [
		{
			label: { type: String, required: true },
			url: { type: String, required: true },
		},
	],
	image: [{ type: String, required: true }],
	author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Project', projectSchema);
