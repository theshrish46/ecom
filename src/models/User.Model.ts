import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    stores: string[],
    role: UserRole,
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    stores: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    }

}, {
    timestamps: true
})
UserSchema.pre<User>('save', async function (next) {
    const user = this

    if (!user.isModified('password')) {
        return next()
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error: any) {
        next(error)
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this
    return await bcrypt.compare(candidatePassword, user.password)
}

const UserModel = mongoose.model<User>('User', UserSchema)


export default UserModel;