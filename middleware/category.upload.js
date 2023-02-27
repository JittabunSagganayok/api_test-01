// Middleware คือฟังก์ชั่นที่เราทำการส่งเข้าไปเพื่อให้ควบคุมหรือจัดการกับข้อมูลทั้งก่อนหรือหลังที่ mongoose นั้นจะทำการจัดการกับ schema นั่นเองครับ
// multer เป็น middleware ที่ช่วยจัดการ การอัพโหลดไฟล์ในฝั่ง Node.js ซึ่งทำให้การอัพโหลดไฟล์เป็นเรื่องที่ง่ายมากๆ เพียงแค่เราเรียกใช้ multer และทำการกำหนดปลายทางที่เราต้องการเก็บไฟล์ 

const multer = require("multer");
const Path = require("path");

//storage ที่จัดเก็บข้อมูลในการอัพโหลด
const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null,"./uploads/categories")
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + "-"+ file.originalname);
    }
});

//fileFilter การจัดการไฟล์ที่อัพโหลด 
const fileFilter = (req,file,callback) => {
    const acceptableExt = [".png",".jpg",".jpeg"];
    if(!acceptableExt.includes(Path.extname(file.originalname))){
        return callback(new Error("Pls use jpg or png !"));

    }

    const fileSize = parseInt(req.headers["content-length"]);

    if(fileSize>1048576){
        return callback(new Error("File Size too big !"));e
    }

    callback(null,true);
}

//สร้างตัวแปร upload ให้ใช้ function Storage และ fileFilter
let upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    fileSize: 1048576,
});

module.exports = upload.single("categoryImage");