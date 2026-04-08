let express = require('express');
let router = express.Router();
const fs = require('fs');
const { stringify } = require('querystring');

const data = fs.readFileSync('./clubs.json', 'utf8');
const clubs = JSON.parse(data);


router.get('/', function(req,res) {
res.json(clubs);
})


router.post('/', function (req, res){
    const newBookClub = req.body;
    clubs.clubs.push(newBookClub);
    fs.writeFileSync('./clubs.json', JSON.stringify(clubs));
    res.json(newBookClub);
    
});

module.exports = router;