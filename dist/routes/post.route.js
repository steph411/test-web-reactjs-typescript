"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const comment_controllers_1 = require("../controllers/comment.controllers");
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("../config/multer");
// import { multer } from '../config/multer';
const postRoute = () => {
    const router = (0, express_1.Router)();
    /**
     * route to create a post : text and images then publish it
     */
    router.post('/post', (0, multer_1.default)(multer_2.multerConfig).single('image'), post_controller_1.createdPost);
    /**
    * route to display for all publications
    */
    router.get('/showPost', post_controller_1.getAllPost);
    /**
  * route to  Retrieve one publication
  */
    router.get('/showPost/:id', post_controller_1.getOnePost);
    /**
   * route to create a comment : text
   */
    router.post('/comment/:id', comment_controllers_1.createdComment);
    router.patch('/post/:postId/comment/:commentId', comment_controllers_1.updateComment);
    // router.delete('/post/:id', ('Failed to update comment');
    return router;
};
exports.postRoute = postRoute;
