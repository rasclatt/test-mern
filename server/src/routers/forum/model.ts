import { IForum } from "./interface";
import mongoose, { Model, Schema } from "mongoose";

const modelName = 'forum';

const schema = new Schema({
    uid: {
        type: String,
        required: true,
    },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const objModel: Model<IForum & Document> = mongoose.models[modelName] || mongoose.model<IForum & Document>(modelName, schema);

class Forum
{
    static async create(body: IForum)
    {
        return await (new objModel(body)).save();
    }

    static async get(body?: {[key: string]: string}, sort?: {[k: string]: any})
    {
        return (body)? await this.getBy(body, undefined, sort) : sort? await objModel.find().sort(sort) : await objModel.find();
    }

    static async getById(id: string)
    {
        return await objModel.findById(id);
    }

    static async getBy<T = any>(body: {[key: string]: string}, single?: boolean, sort?: {[k: string]: any}): Promise<T>
    {
        const u = objModel;
        return single? await u.findOne(body) as unknown as T : sort? await u.find(body).sort(sort) as unknown as T : await u.find(body) as unknown as T;
    }

    static async update(id: string, body: IForum): Promise<IForum | null> {
      const updatedDocument = await objModel.findByIdAndUpdate(id, body, { new: true });
      return updatedDocument;
  }

    static async delete(id: string)
    {
        return objModel.findByIdAndDelete(id);
    }
}

export default Forum;