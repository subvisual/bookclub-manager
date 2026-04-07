let express = require('express');
let router = express.Router();
const fs = require('fs');

const data = fs.readFileSync('../clubs.json', 'utf8');
const clubs = JSON.parse(data);


router.get('/', function(req,res) {
res.json(clubs);
})
module.exports = router;