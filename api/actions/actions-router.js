// Imports
const Actions = require('./actions-model');
// Router
const { Router } = require('express');
const router = Router();
// Middleware
const { validateActionId, validateActionBody } = require('./actions-middlware');
const { validateProjectId } = require('../projects/projects-middleware');

// Endpoints
router.get('/', (req, res, next) => {
	Actions.get()
		.then(actions => {
			res.json(actions);
		})
		.catch(next);
});

router.get('/:id', validateActionId, (req, res, next) => {
	Actions.get(req.params.id)
		.then(action => {
			res.json(action);
		})
		.catch(next);
});

router.post('/', validateProjectId, validateActionBody, (req, res, next) => {
	Actions.insert(req.body)
		.then(newAction => {
			res.json(newAction);
		})
		.catch(next);
});

router.put('/:id', validateActionId, validateActionBody, (req, res, next) => {
	Actions.update(req.params.id, req.body)
		.then(updatedAction => {
			res.json(updatedAction);
		})
		.catch(next);
});

router.delete('/:id', validateActionId, (req, res, next) => {
	Actions.remove(req.params.id)
		.then(deletedCount => {
			res.json(deletedCount);
		})
		.catch(next);
});

// Error Handling
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customError: 'Uh oh. Something went wrong.',
    message: err.message,
    stack: err.stack
  });
});

// Export

module.exports = router;