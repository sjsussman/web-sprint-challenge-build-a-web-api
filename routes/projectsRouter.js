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
  
router.post('/:id', (req, res) => {

});
  
router.delete('/:id', (req, res) => {

});
  
router.put('/:id', (req, res) => {

});

module.exports = router;