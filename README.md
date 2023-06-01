# Portfolio - server side

El server hace la función de la API para el Front-End que puedes encontrar aquí [here](https://github.com/eoGimenez/portfolio-client)

## About

Mi nombre es Eugenio, soy Web Developer y desde el primer dia que empecé a escribir código me di cuenta que este universo era el que había estado buscando durante mucho tiempo.
El server funciona como una API para ser consumida en el Front, a parte del CORS tiene una validacion que es un hash que sirve para autorizar los metodos POST, PUT y DELETE, la idea es evitar la necesidad de un inicio de sesión para poder mostrar el portfolio de una manera más natural.


## Guia de instalacion

- Haz un fork del repositorio
- Clone 
- Definir variable "CRYPTCODE", en esta variable tienes que asignarle el resultado en codigo hash de tu palabra secreta,
aquí tienes un generador de codigo hash para bryptjs : [here](https://bcrypt-generator.com/)

```shell
$ cd portfolio-client
$ npm install
$ npm run dev
```

## Modelo

Projects.model.js

```js
const projectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	secDescription: { type: String, required: true },
	technologies: [{ type: String, required: true }],
	urlGit: [{
			label: { type: String, required: true },
			url: { type: String, required: true },
		},],
	image: [{ type: String, required: true }],
	author: { type: Schema.Types.ObjectId, ref: 'User' },
});
```

Users.model.js

```js
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
	projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});
```

## End Points

project.router.js

| Método | Endpoint | Require  | Response (200)  | Action  |
| :----: | :--------------: | :-------------------: |:-----------------: | --------------------------- |
| GET | / | none | res.json({ response }) | Devuelve la lista de los proyectos en la API. |
| GET | /:projId | none | res.json(result) | Devuelve el proyecto con el id en el param. |
| POST | /upload | const { file } = req.file | res.json({ imageUrl: req.file.path }) | Sube la imagen a la base de datos y devuelve la URL. |
| POST | / | const { title, description, secDescription, technologies, urlGit, image, author } = req.body | res.status(201).json({ response: `Created !` }) | Crea un nuevo proyecto en la API con los datos proporcionados. | 
| PUT | /:projId | const { projId } = req.params & const { title, description, secDescription, technologies, urlGit, image } = req.body | res.json(result.data) | Actualiza un proyecto en la API. |
| DELETE | /:projId | const { projId } = req.params | res.status(202).json({ message: `Project was deleted` }) | Elimina el proyecto con la ID proporcionada. 


auth.router.js

| Método | Endpoint | Require  | Response (200)  | Action  |
| :----: | :--------------: | :-------------------: |:-----------------: | --------------------------- |
| POST | /signup | const { email, password, passwordRe, userName, ownCode } = req.body; | res.status(201).json({ user: user }); | Registra un nuevo usuario en la DB. |
| POST | /login | const {email, password } = req.body; | res.status(200).json({ authToken }); | Devuelve el JWT al cliente |
| GET |  /verify | none | res.status(200).json(req.payload); | Autentifica si el JWT es valido |
---
