const express = require('express');
const Action = require('../data/helpers/actionModel.js')
const router = express.Router();

router.get('/', (req, res) => {
Action.get()
.then(action => {
    res.status(200).json(action)
    console.log(action)
})
.catch(error => {
    console.log(error)
    res.status(500).json({
        message: 'Unable to retrieve actions'
    })
})
});

router.get('/:id', validateActionId, (req, res) => {
res.status(200).json(req.action)
    });
  
router.post('/', validateAction, (req, res) => {
    Action.insert(req.body)
    .then(addedAction => {
        res.status(200).json({
            message: 'Successfully added action!'
        })
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({
            message: "There was an error adding this action, check to make sure Project ID is valid"
        })
    })

});
  
router.delete('/:id', (req, res) => {
    Action.remove(req.params.id)
    .then(deletedAction => {
        console.log(deletedAction)
        res.status(200).json({
            message: 'Successfully deleted action',
        })
    })
});
  
router.put('/:id', validateActionId, validateAction, (req, res) => {
    Action.update(req.params.id, req.body)
    .then(updatedAction => {
        console.log(updatedAction)
        res.status(200).json({
            message: 'Successfully updated action',
            Update: req.body
        })
    })
});
  
// custom middleware

function validateActionId(req, res, next) {
    // do your magic!
    const { id } = req.params;
    Action.get(id)
    .then(action => {
      console.log('This is what your CRUD operation is returning:', action)
      if(action){
        req.action = action
        next()
      } else {
        res.status(404).json({
          message: `Error loading the action with id ${id}`
        })
      }
    })  
  }
  
function validateAction(req, res, next) {
    // do your magic!
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: 'missing action data'
      })
    } else if (!req.body.project_id) {
      res.status(400).json({
        message: 'missing required project ID'
      })
    } else if (!req.body.description) {
        res.status(400).json({
          message: 'missing required description field'
        })
      }  else if (!req.body.notes) {
        res.status(400).json({
            message: 'missing required notes'
        })
      } else if (!req.body.completed) {
        res.status(400).json({
          message: 'missing completed status'
        })
      } else {
      next()
      }
    }

module.exports = router;
  

//make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.

//Add an endpoint for retrieving the list of actions for a project.