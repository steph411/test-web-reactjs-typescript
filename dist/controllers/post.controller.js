"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnePost = exports.getAllPost = exports.createdPost = void 0;
const Post = require('../models/post.model');
/**
 * function  to create a post : text and images then publish it
 */
const createdPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        let newPost = new Post(data);
        yield newPost.save();
        if (data.title === 0) {
            return res.status(422).json({
                message: 'At least the title of the publication is required',
            });
        }
        return res.status(201).json({ message: "Post added successfully. ", data: newPost });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createdPost = createdPost;
/**
 * function to display for all publications
 */
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post.find().populate('comments').sort('-createdAt').exec();
    return res.status(200).json({ data: posts });
});
exports.getAllPost = getAllPost;
/**
 * function to  Retrieve one publication and commets
 */
const getOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield Post.findOne({ _id: id }).populate('comments');
    if (!post) {
        return res.status(404).json({ message: `Post with id "${id}" not found.` });
    }
    return res.status(200).json({ data: post });
});
exports.getOnePost = getOnePost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, image, comment } = req.body;
    const post = yield Post.findOne({ _id: id });
    if (!post) {
        return res.status(404).json({ message: `Post with id "${id}" not found.` });
    }
    if (!title) {
        return res.status(422).json({ message: 'The field and title are required' });
    }
    yield Post.updateOne({ _id: id }, { title, image, comment });
    const postUpdated = yield Post.findById(id, { title, image, comment });
    return res.status(200).json({ data: postUpdated });
});
