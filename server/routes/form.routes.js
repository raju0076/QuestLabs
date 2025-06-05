import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UserProfile } from '../models/form.models.js';

const formRouter = express.Router();

const uploadFolder = path.join('uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });



formRouter.post('/addUsers', upload.single('photo'), async (req, res) => {
  try {
    const { firstName, lastName, title, photoUrl, linkedin, twitter } = req.body;

    if (!firstName || !lastName || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = new UserProfile({
      firstName,
      lastName,
      title,
      photo: req.file ? req.file.filename : null, // Save only file name (or full path if needed)
      photoUrl,
      linkedin,
      twitter
    });

    await newUser.save();
    res.status(201).json({ message: "User profile created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating user profile", error: error.message });
  }
});




formRouter.get('/getUsers', async (req, res) => {
  try {
    const users = await UserProfile.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

formRouter.delete("/delete/:id",async(req,res)=>{
        try {
            const {id}=req.params
            const users=await UserProfile.findByIdAndDelete(id)
            res.status(200).json({msg:"deleted successfully"})
        } catch (error) {
                res.status(500).json({ message: 'Failed to fetch users', error: error.message });

        }
})
export default formRouter;