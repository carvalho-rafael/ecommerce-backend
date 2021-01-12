/* eslint-disable camelcase */
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    email: string,
    password?: string,
    password_reset_token?: string,
    password_reset_expires?: Date,
    is_admin: boolean,
    __v?: number,
}

const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    password_reset_token: {
        type: String,
    },
    password_reset_expires: {
        type: Date,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
});

UserSchema.pre('save', function hash(next) {
    if (!this.isModified('password')) {
        return next();
    }
    if (!this.password) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export default mongoose.model<IUser>('User', UserSchema);
