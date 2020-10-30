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
  
router.post('/:id', (req, res) => {

});
  
router.delete('/:id', (req, res) => {

});
  
router.put('/:id', (req, res) => {

});
  
// custom middleware
  
function validatePostId(req, res, next) {

}

module.exports = router;
  

//make sure the project_id provided belongs to an existing project. If you try to add an action with an id of 3 and there is no project with that id the database will return an error.

//Add an endpoint for retrieving the list of actions for a project.