/*jshint esversion: 6 */

const mongoose = require ('mongoose');
const schema = mongoose.Schema;

//Create a schema
const userSchema= new schema({
       
    firstname:
    {
        type:String,
        required: true, /* built in validator  */
        minlength:3/* built in validator  */
    },
    lastname:
    {
        type:String,
        required:true,/* built in validator  */
        minlength:3, /* built in validator  */
    },
    email:
    {
        type:String, 
        required:true,/* built in validator  */
        minlength:3, /* built in validator  */
    },
    password:
    {
        type:String,
        minlength:3, /* built in validator  */
    },
    role:
    {
        type:String,
        enum: ['Admin', 'Customer', 'CSR']
    }

},
{
    collection: "users"
});

//Create a model
const user= mongoose.model("User", userSchema);

//Export the model
module.exports=user;