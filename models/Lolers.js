const mongoose = require('./Connection');
const Joi = require('joi');

const lolerSchema = new mongoose.Schema({
    campeon:{type:String,required:true,minlength:5,maxlength:50,lowercase:true,unique:true},
    coleccion:{type:String,required:true,minlength:5,maxlength:50,lowercase:true,unique:true},
    precio:{type:Number,required:true,min:1}
});

const Loler = mongoose.model('lolers',lolerSchema);

function validateLoler(body){
    const lolerSchema = {
        campeon: Joi.string().min(5).max(50).required(),
        coleccion: Joi.string().min(5).max(50).required(),
        precio: Joi.number().min(1).required()
    }
    return Joi.validate(body,lolerSchema);
}

module.exports.Loler = Loler;
module.exports.validateLoler = validateLoler;