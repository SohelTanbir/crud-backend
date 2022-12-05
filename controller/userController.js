const User = require("../model/user");
const bcrypt = require("bcryptjs");



//get all users
const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).send(users)
}
// get user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }

}
// insert user data into database
const addUser = (req, res) => {

    try {
        bcrypt.hash(req.body.password, 10, (err, hashPassword)=>{
            if(!err){
    
                const userData = {
                    name:req.body.name,
                    email:req.body.email,
                    password:hashPassword,
                    phone:req.body.phone,
                    city:req.body.city,
                    role:req.body.role
                }
                  
                if(userData.name !=="" && userData.email !=="" && userData.password !==" " && userData.city!=="" && userData.phone!==""){
                    const newUser =  new User(userData);
                    newUser.save((err, data)=>{
                        if(!err){
                            res.status(200).json({
                                success:true,
                                message:"User Added Succesfully!"
                            })
                        }else{
                            res.status(500).json({
                                success: false,
                                message: 'There was a Server side Error!'
                            })
                        }
                    })
                }else{
                    res.status(402).json({
                        success: false,
                        message: 'All Fields required!'
                    })
                }
            }else{
                res.status(402).json({
                    success: false,
                    message: 'Something wrong!'
                })
            }
         })
    } catch (error) {
        res.status(402).json({
            success: false,
            message: 'All Fields required!'
        })
    }
}
// delete user by id
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            result: result,
            message: 'User deleted successfully'
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }

}
// update user 
const updateUser = (req, res) => {
    const id = req.params.id;
    const updateData = {};
    if(req.body.name){
        updateData.name = req.body.name
    }
    if(req.body.email){
        updateData.email = req.body.email
    }
    if(req.body.phone){
        updateData.phone = req.body.phone
    }
    if(req.body.city){
        updateData.city = req.body.city
    }
    if(req.body.role){
        updateData.role = req.body.role
    }
    User.findByIdAndUpdate(id, updateData, (err, result) => {
        if(!err){
            res.status(200).json({
                success:true,
                message:'User updated successfully!'
            })      
        }
    })
   
}

// login user by email and password
const loginUser = async (req, res) => {
    try {
        const inputEmail = req.body.email;
        const inputPass = req.body.password;
        const user = await User.findOne({email:inputEmail});
    if(user){
        const isPasswordMatch= await  bcrypt.compare(inputPass, user.password);
        if (isPasswordMatch) {
         res.json({
             Login: "Success",
             user: user
         })
     } else {
         res.status(400).json({
             message: "incorrect password!"
         })
     }
    }else{
        res.status(404).json({
            message: "user not found!"
        })
    }
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!"
        })
    }
}


module.exports = {
    getUsers,
    addUser,
    getUserById,
    deleteUser,
    updateUser,
    loginUser
}