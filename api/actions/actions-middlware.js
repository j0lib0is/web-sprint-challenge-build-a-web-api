// Imports
const Actions = require('./actions-model');
const yup = require('yup');

// Middleware
const validateActionId = (req, res, next) => {
	Actions.get(req.params.id)
		.then(action => {
			if (action) {
				next();
			} else {
				next({status: 404, message: 'Action not found.'});
			};
		})
		.catch(next);
};

const actionSchema = yup.object({
	description: yup.string().required().max(128),
	notes: yup.string().required()
})

const validateActionBody = async (req, res, next) => {
	try {
		const validatedAction = await actionSchema.validate(req.body);
		req.body = validatedAction;
		next();
	} catch(err) {
		next({status: 400, message: 'Action must include a project id, description and notes'});
	};
};

// Export
module.exports = {
	validateActionId,
	validateActionBody
};