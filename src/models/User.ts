/* eslint-disable camelcase */
import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document{
    email: string,
    password: string,
    password_reset_token: string,
    password_reset_expires: Date,
    is_admin: boolean,
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
    },
});

UserSchema.pre('save', function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) return next(error);
            // override the cleartext password with the hashed one
            this.password = hash;
            next();
        });
    });
});

export default mongoose.model<IUser>('User', UserSchema);
