const Validator=reuire('validator');a
module.exports=function validatorRegisterInput(data){

    let errors={};
    if(!Validator.isLength(data.name,{min: 2, max:30})){

        errors.name="Names must be between 2 and 30";
        
    }
    return{

        errors,
        isValid:errors
    }
}