var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComplaintSchema = new Schema({
    complaintID: { type: String, unique: true, required: true },
    note: { type: String, required: true },
    date: { type: Date, required: true },
    company: { type: String, required: true },
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

{
    collection: "complaints"
});


const complaint= mongoose.model("Complaint", ComplaintSchema);



module.exports=complaint;

