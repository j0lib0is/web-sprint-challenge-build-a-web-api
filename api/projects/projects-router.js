// Imports
const Projects = require('./projects-model');
// Router
const { Router } = require('express');
const router = Router();
// Middleware
const { validateProjectId, validateProjectBody } = require('./projects-middleware');

// Endpoints
router.get('/', (req, res, next) => {
	Projects.get()
		.then(projects => {
			res.json(projects);
		})
		.catch(next);
});

router.get('/:id', validateProjectId, (req, res, next) => {
	Projects.get(req.params.id)
		.then(project => {
			res.json(project);
		})
		.catch(next);
});

router.post('/', validateProjectBody, (req, res, next) => {
	Projects.insert(req.body)
		.then(newProject => {
			res.json(newProject);
		})
		.catch(next);
});

router.put('/:id', validateProjectId, validateProjectBody, (req, res, next) => {
	Projects.update(req.params.id, req.body)
		.then(updatedProject => {
			res.json(updatedProject);
		})
		.catch(next);
});

router.delete('/:id', validateProjectId, (req, res, next) => {
	Projects.remove(req.params.id)
		.then(deletedCount => {
			res.json(deletedCount);
		})
		.catch(next);
});

router.get('/:id/actions', validateProjectId, (req, res, next) => {
	Projects.getProjectActions(req.params.id)
		.then(actions => {
			res.json(actions);
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