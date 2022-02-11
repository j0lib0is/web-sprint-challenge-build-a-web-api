// Imports
const Projects = require('./projects-model');
const yup = require('yup');

// Middleware
const validateProjectId = (req, res, next) => {
	Projects.get(req.params.id)
		.then(project => {
			if (project) {
				next();
			} else {
				next({status: 404, message: 'Project not found.'});
			};
		})
		.catch(next);
};

const projectSchema = yup.object({
	name: yup.string().required(),
	description: yup.string().required(),
})

const validateProjectBody = async (req, res, next) => {
	try {
		const validatedProject = await projectSchema.validate(req.body);
		req.body = validatedProject;
		next();
	} catch(err) {
		next({status: 400, message: 'Project must include a name and description'});
	};
};

// Export
module.exports = {
	validateProjectId,
	validateProjectBody
};