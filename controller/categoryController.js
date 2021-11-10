const { PrismaClient } = require('@prisma/client');
const { category } = new PrismaClient();


exports.addcategory = async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ "message": "all field require" })
    }
    const categoryExists = await category.findFirst({
        where: { name }
    })
    if (categoryExists) {
        return res.status(400).json({
            msg: "category exists"
        })
    }
    let newcategory = await category.create({
        data: {
            name
        }
    })
    res.status(200).json(newcategory)
};

exports.getAllcategory = async (req, res) => {
    let users = await category.findMany({})
    res.status(200).json(users)
};

exports.updatecategory = async (req, res) => {
    const { name, id } = req.body;
    const updatecategory = await category.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: name
        },
    })
    res.status(200).json(updatecategory)
};

exports.daletecategory = async (req, res) => {
    const id = req.params.id
    if(!id){return res.status(400).json({ "message": "id field require" })}
    const daletecategory = await category.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.status(200).json(daletecategory)
};
