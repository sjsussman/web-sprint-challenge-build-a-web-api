const express = require('express');
const Project = require('../data/helpers/projectModel.js')
const router = express.Router();

router.get('/', (req, res) => {
Project.get()
.then(projects => {
    res.status(200).json(projects)
    console.log(projects)
})
.catch(error => {
    console.log(error)
    res.status(500).json({
        message: 'Unable to retrieve actions'
    })
})
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params
  Project.getProjectActions(id)
  .then(actions => {
    if (actions) {
      res.status(200).json({data: actions})
    } else {
      res.status(400).json({
        message: 'Cannot find project actions'
      })
    }
  })
});
  
router.post('/', validateProject, (req, res) => {
Project.insert(req.body)
.then(newProject => {
console.log(newProject)
res.status(201).json(newProject)
})
.catch(error => {
    console.log(error)
    res.status(400).json({
        message: "There was an error adding this post"
    })
})
});
  
router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
    .then(deletedProj => {
        console.log(deletedProj)
        res.status(200).json({
            message: 'The project has been successfully deleted'
        })
    })
    .catch(error => {
        console.log(error)
        res.status(404).json({
            message: 'We could not delete that project'
        })
    })

});
  
router.put('/:id', validateProject, (req, res) => {
    Project.update(req.params.id, req.body)
    .then(updatedProj => {
        console.log(updatedProj)
        res.status(200).json({
            updatedProj,
            message: 'Successfully updated project requirements'
        })
    })
})

function validateProject(req, res, next) {
    // do your magic!
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: 'missing project data'
      })
    } else if (!req.body.name) {
      res.status(400).json({
        message: 'missing required name field'
      })
    } else if (!req.body.description) {
        res.status(400).json({
          message: 'missing required description field'
        })
      }  else if (!req.body.completed) {
        res.status(400).json({
          message: 'missing completed status'
        })
      } else {
      next()
      }
    }

module.exports = router;