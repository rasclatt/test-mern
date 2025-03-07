import mongoose, { Model, Schema } from "mongoose";
import { hashPassword } from "./helpers";
import { IUser } from "./interface";

const modelName = 'users';

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    usergroup: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
const UsersModel: Model<IUser & Document> = mongoose.models[modelName] || mongoose.model<IUser & Document>(modelName, userSchema);

export class Users
{
    static async create(body: IUser)
    {
        body.password = hashPassword(body.password as string);
        return await (new UsersModel(body)).save();
    }

    static async get(body?: {[key: string]: string})
    {;
        return (body)? await this.getBy(body) : await UsersModel.find();
    }

    static async getById(id: string)
    {
        return await UsersModel.findById(id);
    }

    static async getBy<T = any>(body: {[key: string]: string}, single?: boolean): Promise<T>
    {
        const u = UsersModel;
        return single? await u.findOne(body) as unknown as T : await u.find(body) as unknown as T;
    }

    static async update(id: string, body: IUser)
    {
        return await UsersModel.findByIdAndUpdate(id, body, { new: true });
    }

    static async delete(id: string)
    {
        return await UsersModel.findByIdAndDelete(id);
    }
    
    static async auth(username: string, password: string)
    {
        return await UsersModel.findOne({ username, password });
    }

    static getModel()
    {
        return UsersModel;
    }
}