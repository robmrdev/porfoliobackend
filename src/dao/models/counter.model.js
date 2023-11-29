import mongoose from "mongoose";

const counterCollection = 'counter'

const counterSchema = new mongoose.Schema({
    main: {
        type: Number,
        default: 0
    },
    about: {
        type: Number,
        default: 0
    },
    services:{
        type: Number,
        default: 0
    },
    portfolio:{
        type: Number,
        default: 0
    },
    news:{
        type: Number,
        default: 0
    },
    contact:{
        type: Number,
        default: 0
    },
})


export const counterModel = mongoose.model(counterCollection, counterSchema);