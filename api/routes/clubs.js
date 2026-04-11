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

router.delete('/:id', function(req, res){
    // Para ir buscar o id do pedido, é devolvido em req.params.id e armazenado em id 
    const id = Number(req.params.id);
    // Filtro os clubs e armazeno se for diferente do id.
    const update = clubs.clubs.filter(club => club.id !==id);
    
    clubs.clubs = update
    fs.writeFileSync('./clubs.json', JSON.stringify(clubs));
   
    res.json(update);
})

module.exports = router;