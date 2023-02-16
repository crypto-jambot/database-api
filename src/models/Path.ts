import { Schema, model } from "mongoose";

const SwapPath = new Schema({
    exchanges: {
        type: [
            {
                name: { type: String, required: true },
                fee: { type: Number, required: true },
                pool: { type: String, required: true },
            },
        ],
        required: true,
    },
    ordered: { type: Boolean, required: true },
});
const TokenPath = new Schema({
    name: String,
    symbol: String,
    address: { type: String, required: true },
    decimals: Number,
});

const paths = new Schema(
    {
        addresses: {
            type: [String],
            validate: {
                validator: (v: any[]) => v && v.length > 0,
                message: "Addresses is required",
            },
        },
        swapPath: {
            type: [SwapPath],
            validate: {
                validator: (v: any[]) => v && v.length > 0,
                message: "Swap Path is required",
            },
        },
        tokenPath: {
            type: [TokenPath],
            validate: {
                validator: (v: any[]) => v && v.length > 0,
                message: "Swap Path is required",
            },
        },
    },
    { strictQuery: false, timestamps: true }
);

export const pathModel = model("Path", paths);
