const { PrismaClient } = require('@prisma/client');
const { cart } = new PrismaClient();


exports.addcart = async (req, res) => {
   const { UserID,ProductID} = req.body
   const userID = parseInt(UserID)
   const productID = parseInt(ProductID)
   let newcart = await cart.create({
    data: {
        userID,
        productID
    }
})
    res.status(200).json(newcart)
};

exports.getcart = async (req, res) => {
    let cartdata = await cart.findMany({
        
    })
    res.status(200).json(cartdata)
};


