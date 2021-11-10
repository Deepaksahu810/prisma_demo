const { PrismaClient } = require('@prisma/client');
const { product } = new PrismaClient();


exports.addProduct = async (req, res) => {
    const {name,CategoryID} = req.body
    if (!name || !CategoryID) {
        return res.status(400).json({ "message": "all field require" })
    }
    const productExists = await product.findUnique({
        where: { name }
    })
    if (productExists) {
        return res.status(400).json({
            msg: "user already exists"
        })
    }
    const categoryID = await parseInt(CategoryID)
    let newproduct = await product.create({
        data: {
            name,
            categoryID
        }

    })
    res.status(200).json(newproduct)
};

exports.getAllProduct = async (req, res) => {
    let Product = await product.findMany({})
    res.status(200).json(Product)
};

exports.updateProduct = async (req, res) => {
    const { name,id} = req.body;
    const updateproduct = await product.update({
        where: {
            id:parseInt(id)
        },
        data: {
            name: name
        },
    })
    res.status(200).json(updateproduct)
};

exports.daleteProduct = async (req, res) => {
    const { id} = req.body;
    const deletproduct = await product.delete({
        where: {
            id:parseInt(id)
        }
    })
    res.status(200).json(deletproduct)
};

exports.product = async (req, res) => {
    const id  = req.params.id
    
    let data = await product.findUnique({
        where: {
            id: parseInt(id),
          }
    })
    res.status(200).json(data)
};




