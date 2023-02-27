const { response } = require("express");
const { MONGO_DB_CONFIG } = require("../config/app.config");
const { category } = require("../models/category.model");

//function สร้าง category
async function createCategory(params, callback) {
    if (!params.categoryName) {
        return callback({
            message: "Category Name Required"
        }, "");
    }
    const model = new category(params);
    model.save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return (callback(error))
        });
}

//function ดึงข้อมูลจาก category
async function getCategories(params, callback) {
    const categoryName = params.categoryName;
    var condition = categoryName ? {
        categoryName: { $regex: new RegExp(categoryName), $options: "i" },
    }
        : {};

    //ตั้งค่า จำนวนสินค้า ต่อ 1 หน้า , จำนวนหน้า
    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.pageSize;
    let page = (Math.abs(params.page) || 1) - 1;

    category
        .find(condition, "categoryName categoryImage") //ลองเพิ่ม หาด้วยราคาได้ไหม
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return (callback(error))
        });
    //PAGE_SIZE ตั้งค่าใน file config
}

//function ดึงข้อมูลจาก category ด้วย id
async function getCategorybyId(params, callback) {
    const categoryId = params.categoryId;

    category
        .findById(categoryId)

        .then((response) => {
            if (!response) callback("Not found id");
            else callback(null, response);
        }).catch((error) => {
            return (callback(error));
        });

}

//function update category 
async function updateCategory(params, callback) {
    const categoryId = params.categoryId;

    category
        .findByIdAndUpdate(categoryId,params,{useFindAndModify:false})

        .then((response) => {
            if (!response) callback("Not found id");
            else callback(null, response);
        }).catch((error) => {
            return (callback(error));
        }); 

}
//function delete category 
async function deleteCategory(params, callback) {
    const categoryId = params.categoryId;

    category
        .findByIdAndDelete(categoryId)

        .then((response) => {
            if (!response) callback("Not found id");
            else callback(null, response);
        }).catch((error) => {
            return (callback(error));
        });

}