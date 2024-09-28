import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    picture: string;
    location?: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Exclude password by default
    picture: { type: String, required: true },
    location: { type: String, default: '' },
});

const User = models.User || model('User', UserSchema);

export default User