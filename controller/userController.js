const { PrismaClient } = require('@prisma/client');
const { user} = new PrismaClient();
var jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, lastName } = req.body;
    if (!name || !lastName) {
        return res.status(400).json({ "message": "all field require" })
    }
    const userExists = await user.findUnique({
        where: { name }
    })
    if (userExists) {
        return res.status(400).json({
            msg: "user already exists"
        })
    }
    const role = 1
    let newUser = await user.create({
        data: {
            name,
            lastName,
            role
        }
    })
    res.status(200).json(newUser)
};

exports.getUsers = async (req, res) => {
    const id  = req.params.id
    
    let users = await user.findUnique({
        where: {
            id: parseInt(id),
          }
    })
    res.status(200).json(users)
};

exports.getAllUsers = async (req, res) => {
    let users = await user.findMany({
        include: {data:true}
    })
    res.status(200).json(users)
};

exports.updateUser = async (req, res) => {
    const { name, lastName } = req.body;
    const updateUser = await user.update({
        where: {
            name: name
        },
        data: {
            lastName: lastName
        },
    })
    res.status(200).json(updateUser)
};

exports.daleteUser = async (req, res) => {
    const { name} = req.body;
    const daleteUser = await user.delete({
        where: {
            name: name
        }
    })
    res.status(200).json(daleteUser)
};


exports.login = async (req, res) => {
    const { name,lastName } = req.body
    let users = await user.findUnique({
        where: {
            name: name,
          }
    })
    const token = jwt.sign( users ,"asdfghjklzxcvbnm",{expiresIn: "2h",});
    res.cookie(`token`,token);
    res.send(token);
}