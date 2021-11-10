const router = require('express').Router();

const { register, getAllUsers, updateUser,daleteUser,getUsers, login } = require('../controller/userController.js')
const { addProduct,getAllProduct,updateProduct,daleteProduct,product } = require('../controller/productController.js')
const { addcategory,getAllcategory,updatecategory,daletecategory } =  require('../controller/categoryController.js')
const { addcart,getcart } =  require('../controller/cartController.js')
const { addemployee,getemployee } =  require('../controller/employeeController.js')

const { data } = require('../middleware/auth')

// user routes
router.post('/register',register)
router.get('/getAll',data,getAllUsers)
router.put('/updateUser',data,updateUser)
router.delete('/daleteUser',data,daleteUser)
router.get('/getAll/:id',data,getUsers)
router.post('/login',login)

// product
router.post('/addProduct',data,addProduct)
router.get('/getAllProduct',data,getAllProduct)
router.put('/updateProduct',data,updateProduct)
router.delete('/daleteProduct',data,daleteProduct)
router.get('/getAllProduct/:id',data,product)

// category
router.post('/addcategory',data,addcategory)
router.get('/getAllcategory',data,getAllcategory)
router.put('/updatecategory',data,updatecategory)
router.delete('/daletecategory/:id',data,daletecategory)

// cart
router.post('/addcart',data,addcart)
router.get('/getAllcart',data,getcart)

// employee
router.post('/addemployee',data,addemployee)
router.get('/getAllemployee',data,getemployee)

module.exports = router;
