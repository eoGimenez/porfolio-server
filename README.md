# Portfolio - server side

El server hace la funcion de la API para el Front-End que podes encontrar aca [here](https://github.com/eoGimenez/portfolio-client)

## About

Mi nombre es Eugenio, soy Web Developer y desde el primer dia que empece a escribir codigo me di cuenta que este universo era el que estuve buscando por mucho tiempo.
El server funciona a modo de API para ser consumida en el Front, a parte del cors tiene una validacion que es un codigo que en Hash 
que sirve para autorizar los metodos POST/PUT/DELETE, la idea es evitar que exista un login para poder mostrar el Portfolio mas naturalmente,


## Guia de instalacion

- Fork el repo
- Clone 
- Definir al .env la variable "CRYPTCODE", en esta variable tenes que asignarle el resultado en codigo Hash de tu palabra secreta,
aca tenes un generador de codigo Hash para bryptjf : [here](https://bcrypt-generator.com/)


## Modelo

```js
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
```

## End Points

| Method | Endpoint | Require  | Response (200)  | Action  |
| :----: | :--------------: | :-------------------: |:-----------------: | --------------------------- |
| GET | / | none | res.json({ response }) | Devuelve la lista de los proyectos de la API. |
| GET | /:projId | none | res.json(result) | Devuelve el proyecto con el id en el param. |
| POST | /upload | const { file } = req.file | res.json({ imageUrl: req.file.path }) | Sube la imagen a la base de datos y devuelve el Url. |
| POST | /new | const { title, description, secDescription, technologies, urlGit, image, ownCode } = req.body | res.status(201).json({ response: `Created !` }) | Crea en la API el nuevo proyecto con los datos proporcionados. | 
| PUT | /:projId/edit | const { projId } = req.params & const { title, description, secDescription, technologies, urlGit, image, ownCode } = req.body | res.json(result.data) | Actualiza un proyecto de la API. |
| DELETE | /:projId/delete | const { projId } = req.params & const { ownCode } = req.body | res.status(202).json({ message: `Project was deleted` }) | Remueve el proyecto con la ID proporcionada. 


---
