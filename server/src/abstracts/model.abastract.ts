import mongoose from "mongoose";

export const AbstractModel = <T>(name: string, schema: mongoose.Schema<T>): any => mongoose.model(name, schema);