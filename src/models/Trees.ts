import { Schema, model } from "mongoose";

const tree = new Schema();

tree.add({
    node: {
        name: { type: String },
        symbol: { type: String },
        address: { type: String, required: true },
        decimals: { type: Number },
    },
    swap: {
        type: {
            exchanges: {
                type: [
                    {
                        name: { type: String, required: true },
                        fee: { type: Number, required: true },
                        pool: { type: String, required: true },
                    },
                ],
            },
            ordered: { type: Boolean, required: true },
        },
        required: false,
    },
});
tree.add({ children: [tree] });

const trees = new Schema({
    _id: { type: String, required: true },
    trees: [tree],
});
export const treeListsModel = model("backfill_trees", trees);
