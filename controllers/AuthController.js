import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import {renameSync, unlinkSync} from 'fs';

const maxAge = 3*24*60*60*1000;

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY,{
        expiresIn: maxAge
    })
};

export const signup = async(req, res, next) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send('Email or password is required')
        }

        const user = await User.create({email, password});
        res.cookie('jwt', createToken(email,user.id),{
            maxAge,
            secure: true,
            sameSite:"None"
        });


        return res.status(201).json({user:{
            id:user.id,
            email:user.email,
            profileSetup: user.profileSetup
        }})

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

export const login = async(req, res, next) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send('Email or password is required')
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send('User with the given email not found.')
        };

        const auth = await compare(password, user.password);

        if(!auth){
            return res.status(400).send('Password is iscorrect.')
        };

        res.cookie('jwt', createToken(email,user.id),{
            maxAge,
            secure: true,
            sameSite:"None"
        });


        return res.status(200).json({user:{
            id:user.id,
            email:user.email,
            profileSetup: user.profileSetup,
            firstName:user.firstName,
            lastName: user.lastName,
            image: user.image,
            color: user.color
        }})

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

export const getUserInfo = async(req, res, next) =>{
    try{
        const userData = await User.findById(req.userId);
        if(!userData){
            return res.status(404).send('User with the given id not found.');
        }
        // console.log(req.userId)
        return res.status(200).json({
            id:userData.id,
            email:userData.email,
            profileSetup: userData.profileSetup,
            firstName:userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        })

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export const updateProfile = async(req, res, next) =>{
    try{
        const {userId} = req;
        const {firstName, lastName, color} = req.body;
        // console.log({firstName, lastName, color})
        if(!firstName || !lastName){
            return res.status(404).send('First,last and color is required!');
        }

        const userData = await User.findByIdAndUpdate(
            userId,{
                firstName, 
                lastName, 
                color, 
                profileSetup:true
            },{
                new:true, runValidators: true
            });
        if(!userData){
            return res.status(404).send('User with the given id not found.');
        }
        // console.log(req.userId)
        return res.status(200).json({
            id:userData.id,
            email:userData.email,
            profileSetup: userData.profileSetup,
            firstName:userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color
        })

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export const addProfileImage = async(req, res, next) =>{
    try{
        if(!req.file){
            return res.status(400).send('File is required.')
        }

        const date = Date.now();
        let fileName = 'uploads/profiles/' + date + req.file.originalname;
        renameSync(req.file.path, fileName);

        const updateUser = await User.findByIdAndUpdate(
            req.userId, 
            {image: fileName},
            {new:true, runValidators:true}
        );

        // console.log(req.userId)
        return res.status(200).json({
            image: updateUser.image,
        })

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export const removeProfileImage = async(req, res, next) =>{
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).send('User not found');
        }

        if(user.image){
            unlinkSync(user.image)
        }

        user.image = null;
        await user.save();


        // console.log(req.userId)
        return res.status(200).send('Profle image removed successfully.');

    }catch(error){
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}
