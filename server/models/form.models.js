import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    
    type: String, 
    default: null
  },
  photoUrl: {
    type: String,
    default: '',
    validate: {
      validator: function (value) {
        return !value || value.startsWith('http'); 
      }
    }
  },
  linkedin: {
    type: String,
    default: '',
    validate: {
      validator: function (value) {
        return !value || value.startsWith('https://');
      }
    }
  },
  twitter: {
    type: String,
    default: '',
    validate: {
      validator: function (value) {
        return !value || value.startsWith('https://');
      }
    }
  }
}, { timestamps: true });

export const UserProfile = mongoose.model('UserProfile', userProfileSchema);
