const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	password: {
		type: String,
		require: [true, 'Password is required'],
	},
	userName: {
		type: String,
		required: [true, 'User name is required'],
	},
	// Evaluar la posibilidad de sumarle la relacion de los proyectos
	// projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = model('User', userSchema);
