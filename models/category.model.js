const mongoose = require("mongoose");

//สร้าง model category มี categoryName,categoryDescription, categoryImage
const category = mongoose.model(
    "Category",
    mongoose.Schema(
        {
            categoryName : {
                type : String,
                require: true,
                unique:true,

            },
            categoryDescription:{
                type:String,
                required:false,
            },
            categoryImage:{
                type:String,
            },
        }
    )
);

module.exports = {
    category, 
}

//ถ้าจะเปลี่ยนโมเดลข้อมูลดูคลิป  เรียนรู้การสร้าง REST API ด้วย NodeJS + Express + MongoDB นาทีที่ 10.00