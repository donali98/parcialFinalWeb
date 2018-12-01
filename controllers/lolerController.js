const {Loler,validateLoler} = require('../models/Lolers');

const lolerController = {};

lolerController.add = async(req,res)=>{
    const validationResult = validateLoler(req.body);
    if(validationResult.error){
        res.status(400).json(validationResult);
        return;
    }
    const loler = new Loler({
        campeon: req.body.campeon,
        coleccion: req.body.coleccion,
        precio: req.body.precio


    });
    const result = await loler.save();

    res.json(result);
}
lolerController.find = async(req,res)=>{
    const result = await Loler.find();

    res.json(result);
}
lolerController.update = async(req,res)=>{
    const result = await Loler.findOneAndUpdate({_id:req.params.id},{
        campeon: req.body.campeon,
        coleccion: req.body.coleccion,
        precio: req.body.precio
    });

    res.json(result);
}

module.exports = lolerController;