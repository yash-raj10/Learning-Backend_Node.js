import { User } from "../models/user.js";

export const getAllUsers =  async (req, res)=>{
    const users = await User.find({});
    console.log(req.query.keys);


    res.json({
        success: true,
        users: users,

    });
};

export const register = async (req, res)=>{
    const { name,email,password }= req.body

   await User.create({
       name, // key value pair same hai to teenoi chije  as it is bhajenge
       email,
       password,
   });

   res.status(201).cookie("temp", "lolo").json({
       success: true,
       message: "reg success",

   });
};



/////////////////////////////////////////////////////////////

export const getUserDetails = async(req, res)=>{
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success:true,
        user,
    });
};

export const updateUser = async(req, res)=>{
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success:true,
        message: "updated",
    });
};

export const deleatUser = async(req, res)=>{
    const { id } = req.params;
    const user = await User.findById(id);

    res.json({
        success:true,
        message: "Deleated",
    });
};