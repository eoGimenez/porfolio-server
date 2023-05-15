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
	// projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

module.exports = model('User', userSchema);
