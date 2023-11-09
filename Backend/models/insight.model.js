const mongoose = require("mongoose");

const insightSchema = mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    wordCount:{
        type:Number,
        required:true
    },
    images:[String],
    videos:[String],
    weblinks:[String],
    favorite:{
        type:Boolean,
        default:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
},{
    timestamps: true 
});

const InsightModel = mongoose.model("insight",insightSchema);

module.exports={
    InsightModel
}