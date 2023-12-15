import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  refreshToken: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      username: this.username
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFERSH_TOKEN,
    {
      expiresIn: process.env.REFERSH_TOKEN_EXPIRY
    }
  )
}

const User = mongoose.model('user', UserSchema)

export default User