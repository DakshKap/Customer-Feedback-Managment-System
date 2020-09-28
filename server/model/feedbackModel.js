const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const FeedbackSchema = new Schema({

    feedback:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    date:
    {
        type: String,
        required: true
    },
    company:
    {
        type: String,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    collection: "feedbacks"
});


const feedback= mongoose.model("Feedback", FeedbackSchema);


module.exports=feedback;