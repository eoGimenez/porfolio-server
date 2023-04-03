const router = require('express').Router();
const Project = require('../models/Projects.model');
const fileUploader = require('../config/cloudinary.config');
const bcrypt = require('bcryptjs');

router.get('/', (req, res, next) => {
	Project.find()
		.then((response) => {
			res.json({ response });
		})
		.catch((err) => next(err));
});
//tengo que ver si voy a usar esta ruta, creo que desde front es mejor llamar al contecto cuando alguien entra directamente en una ID, de esa forma ya queda el contexto, pensarlo,...
router.get('/:projId', (req, res, next) => {
	const { projectId } = req.params;
	Project.findById(projectId)
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

router.post('/new', (req, res, next) => {
	const { title, description, technologies, url, image, ownCode } = req.body;
	if (!bcrypt.compareSync(ownCode, process.env.CRYPTCODE)) {
		res.json({ error: 'Your Owner Code is not correct' });
		return;
	}
	Project.create({ title, description, technologies, url, image })
		.then((response) => {
			res.json({ response: 'Created !' });
		})
		.catch((err) => console.log('paso esto', err));
});

router.put('/:projId/edit', (req, res, next) => {
	const { projectId } = req.params;
	const { title, description, technologies, url, image, ownCode } = req.body;
	if (!bcrypt.compareSync(ownCode, process.env.CRYPTCODE)) {
		res.json({ error: 'Your Owner Code is not correct' });
		return;
	}
	Project.findByIdAndUpdate(
		projectId,
		{ title, description, technologies, url, image },
		{ new: trie }
	)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => next(err));
});

router.delete('/:projId/delete', (req, res, next) => {
	const { projId } = req.params;
	const { ownCode } = req.body;
	if (!bcrypt.compareSync(ownCode, process.env.CRYPTCODE)) {
		res.json({ error: 'Your Owner Code is not correct' });
		return;
	}
	Project.findByIdAndDelete(projId)
		.then((result) => {
			res.json({ message: `Project was deleted` });
		})
		.catch((err) => next(err));
});

module.exports = router;
