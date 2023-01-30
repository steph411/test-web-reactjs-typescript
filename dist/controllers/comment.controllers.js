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
exports.updateComment = exports.createdComment = void 0;
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
// app.post('/publications/:id/comments'
const createdComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const post = yield Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: `Post with id  not found.` });
            return;
        }
        const comment = new Comment(data);
        yield comment.save();
        post.comments.push(comment._id);
        yield post.save();
        return res.status(201).json({ message: "Post added successfully. ", comment: comment });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.createdComment = createdComment;
// );
// const deleteComment = async (req: Request, res: Response) => {
//     try {
//         if (post) {
//             const index = user.beneficiaries.findIndex(o => o == req.params.comment)
//             if (index > -1) {
//               user.beneficiaries.splice(index, 1)
//               await user.save()
//               return res.json({ message: "comment deleted successfully." })
//             } else {
//               return res.status(400).json({ message: "Unable to find the comment." })
//             }
//           }
//       } catch (err) {
//         res.status(500).json({ message: 'Failed to delete comment'});
//       }
//   };
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, commentId } = req.params;
        const updatedComment = req.body;
        const post = yield Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'post not found' });
        }
        const commentIndex = post.comments.findIndex((c) => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        post.comments[commentIndex] = updatedComment;
        yield post.save();
        return res.json(post);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to update comment' });
    }
});
exports.updateComment = updateComment;
