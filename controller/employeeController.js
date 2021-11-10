const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

exports.addemployee = async (req, res) => {
   const { name, lastName, Role } = req.body
   
   if(!name || !lastName || !Role){
      return res.status(400).json({"msg":"all field id require"})
   } 

   const checkUserExists = await user.findUnique({
      where: { name }
   }) 
   if (checkUserExists) {
      return res.status(400).json({
          msg: "user already exists"
      })
  }
   const role = await parseInt(Role)

   const data = await user.create({
      data: {
         name,
         lastName,
         role
      }
   })
   res.status(200).json({ "msg": "done" })

}

exports.getemployee= async(req,res) => {
   const data = await user.findMany({
      include: {data:true}
   })
   res.status(200).json(data)
}