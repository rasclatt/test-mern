import mongoose from "mongoose";

const AbstractSchema = <T>(body?: T): mongoose.Schema<T> => new mongoose.Schema<T>(body || {});

export default AbstractSchema;