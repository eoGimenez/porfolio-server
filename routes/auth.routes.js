const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');
const saltRounds = 10;

router.post('/signup', (req, res, next) => {
	const { email, password, passwordRe, userName, ownCode } = req.body;

	if (email == '' || password == '' || passwordRe == '' || userName == '' || ownCode == '') {
		res.status(400).json({ messageError: 'Please complete ALL mandatory fields !' });
		return;
	}
	const CRYPTCODE = '$2a$10$xMtAv2fhVtwpz8nnpucvUO2lc/lR/b1dfWa6aem/Yz/gP5ZDMGXoW';
	if (!bcrypt.compareSync(ownCode, CRYPTCODE)) {
		res.status(403).json({ messageError: 'Your Owner Code is not correct !' });
		return;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		res.status(400).json({ messageError: 'Provide a valid email address.' });
		return;
	}

	User.findOne({ email }).then((result) => {
		if (result) return res.status(400).json({ messageError: 'User already exists.' });

		const salt = bcrypt.genSaltSync(saltRounds);
		const hashedPass = bcrypt.hashSync(password, salt);

		return User.create({ email, password: hashedPass, userName })
			.then((response) => {
				const { email, userName } = response;
				const user = { email, userName };
				res.status(201).json({ user: user });
			})
			.catch((err) => next(err));
	});
});

router.post('/login', (req, res, next) => {
	const { email, password } = req.body;

	if (email === '' || password === '') {
		res.status(400).json({ messageError: 'Please, provide email and password.' });
		return;
	}

	User.findOne({ email })
		.then((result) => {
			if (!result) {
				res.status(401).json({ messageError: 'Wrong credentials, please, check them.' });
				return;
			}

			if (!bcrypt.compareSync(password, result.password)) {
				res.status(401).json({ messageError: 'Wrong credentials, please, check them.' });
				return;
			}

			const { email, userName } = result;
			const payload = { _id, email, userName };
			const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
				algorithm: 'HS256',
				expiresIn: '6h',
			});
			res.status(200).json({ authToken });
		})
		.catch((err) => next(err));
});
router.get('/verify', isAuthenticated, (req, res, next) => {
	res.status(200).json(req.payload);
});

module.exports = router;
