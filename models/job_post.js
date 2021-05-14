const mongoose = require("mongoose");

const postjobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    tag:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        required:true,
        enum:[
            "Received",
            "Accepted",
            "Rejected",
        ]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Emp_r",
    },
},
{
    timestamps:true,
}
);


const job = mongoose.model("job",postjobSchema,"Job_post")

module.exports = job;