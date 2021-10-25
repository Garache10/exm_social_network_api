import { Schema, model } from 'mongoose';

const TransactionLog = new Schema({
    process: { type: String, required: true },
    complete: { type: Boolean, required: true},
    keyFilter: { type: String },
    jsonRequest: { type: String },
    jsonResponse: { type: String }
}, {
    timestamps: true
});

export default model('t_logs', TransactionLog);