const {Loler,validateLoler} = require('../models/Lolers');

const lolerController = {};

lolerController.add = async(req,res)=>{
    const validationResult = validateLoler(req.body);
    if(validationResult.error){
        res.status(400).json(validationResult);
        return;
    }
    try{
        const loler = new Loler({
            campeon: req.body.campeon,
            coleccion: req.body.coleccion,
            precio: req.body.precio
    
    
        });
        const result = await loler.save();
    
        res.json(result);
    }
    catch(ex){
        res.status(400).json(ex);
    }
}
lolerController.find = async(req,res)=>{
    try{
        const result = await Loler.find();

        res.json(result);
    }
    catch(ex){
        res.status(400).json(ex);

    }
}
lolerController.findOne = async(req,res)=>{
    try{
        const result = await Loler.findById(req.params.id);
        res.json(result);
    }
    catch(ex){
        res.status(400).json(ex);

    }
}
lolerController.update = async(req,res)=>{
   try{
        const result = await Loler.findOneAndUpdate({_id:req.params.id},{
            campeon: req.body.campeon,
            coleccion: req.body.coleccion,
            precio: req.body.precio
        },{new:true});

        res.json(result);
   }
   catch(ex){
       res.status(400).json(ex);
   }
}

lolerController.delete = async(req,res)=>{

    try{
        const result = await Loler.findByIdAndRemove({_id:req.params.id});
        res.json(result);
    }
    catch(ex){
       res.status(400).json(ex);
    }
}

module.exports = lolerController;