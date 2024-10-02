const mongoose=require("mongoose")


const schema=new mongoose.Schema(
    {
        userName:
        {
            type:String,
            required:true
        },
        name:
        {
            type:String,
            required:true
        },
        description:
        {
            type:String,
            required:true
        },
        Nrooms:
        {
            type:Number,
            required:true
        },
        Nbathrooms:
        {
            type:Number,
            required:true
        },
        price:
        {
            type:Number,
            required:true
        },
        place:
        {
            type:String,
            required:true
        },
        floor:
        {
            type:Number,
            required:true
        },
        area:
        {
            type:Number,
            required:true
        }
        // imgsURL:
        // {
        //     type:Array
        // }

    }
)


const Home=mongoose.model("Home",schema)

module.exports=Home