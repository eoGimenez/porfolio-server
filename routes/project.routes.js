const router = require('express').Router();
const Project = require('../models/Projects.model');
const User = require('../models/Users.model');
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { response } = require('express');

// const CRYPTCODE = '$2a$10$xMtAv2fhVtwpz8nnpucvUO2lc/lR/b1dfWa6aem/Yz/gP5ZDMGXoW';
//const CRYPTCODE = process.env.CRYPTCODE

router.get('/', (req, res, next) => {
	Project.find()
		.populate('author')
		.then((response) => {
			res.json({ response });
		})
		.catch((err) => next(err));
});

router.get('/:projId', (req, res, next) => {
	const { projId } = req.params;
	Project.findById(projId)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => next(err));
});

router.post('/upload', fileUploader.single('image'), (req, res, next) => {
	if (!req.file) {
		next(new Error('No file selected'));
		return;
	}
	res.json({ imageUrl: req.file.path });
});

router.post('/', isAuthenticated, (req, res, next) => {
	const {
		title,
		description,
		secDescription,
		technologies,
		urlGit,
		image,
		author /* ownCode */,
	} = req.body;
	// if (!bcrypt.compareSync(ownCode, CRYPTCODE)) {
	// 	res.status(403).json({ messageError: 'Your Owner Code is not correct !' });
	// 	return;
	// }
	Project.create({ title, description, secDescription, technologies, urlGit, image, author })
		.then((result) => {
			console.log(result);
			return User.findByIdAndUpdate(author, { $push: { projects: result._id } });
		})
		.then((result) => {
			res.status(201).json({ result: 'Created !' });
		})
		.catch((err) => console.log('paso esto', err));
});

router.put('/:projId', isAuthenticated, (req, res, next) => {
	const { projId } = req.params;
	const { title, description, secDescription, technologies, urlGit, image /* ownCode */ } =
		req.body;
	// if (!bcrypt.compareSync(ownCode, CRYPTCODE)) {
	// 	res.status(403).json({ messageError: 'Your Owner Code is not correct !' });
	// 	return;
	// }
	Project.findByIdAndUpdate(
		projId,
		{ title, description, secDescription, technologies, urlGit, image },
		{ new: true }
	)
		.then((result) => {
			res.status(200).json({result});
		})
		.catch((err) => next(err));
});

router.delete('/:projId', isAuthenticated, (req, res, next) => {
	const { projId } = req.params;
	// const { ownCode } = req.body;
	// if (!bcrypt.compareSync(ownCode, CRYPTCODE)) {
	// 	res.status(403).json({ messageError: 'Your Owner Code is not correct' });
	// 	return;
	// }
	Project.findByIdAndDelete(projId)
		.then((result) => {
			res.status(202).json({ message: `Project was deleted` });
		})
		.catch((err) => next(err));
});

module.exports = router;
