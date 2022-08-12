import { ReplyType } from "./../types/types";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { CommentType, PostType } from "../types/types";
import { db } from "../firebase";

export const postAPI = {
  // create
  async createPost(post: PostType) {
    const res = await addDoc(collection(db, "posts"), { ...post });

    await updateDoc(doc(db, "posts", res.id), { ...post, id: res.id });
  },

  async createComment(comment: CommentType) {
    const res = await addDoc(collection(db, "comments"), { ...comment });

    await updateDoc(doc(db, "comments", res.id), { ...comment, id: res.id });
  },

  async createReply(reply: ReplyType) {
    const res = await addDoc(collection(db, "replies"), { ...reply });

    await updateDoc(doc(db, "replies", res.id), { ...reply, id: res.id });
  },

  // update
  async updatePost(post: PostType) {
    await updateDoc(doc(db, "posts", post.id), { ...post });
  },

  async updateComment(comment: CommentType) {
    await updateDoc(doc(db, "comments", comment.id), { ...comment });
  },

  async updateReply(reply: ReplyType) {
    await updateDoc(doc(db, "replies", reply.id), { ...reply });
  },

  // delete
  async deletePost(post: PostType) {
    await deleteDoc(doc(db, "posts", post.id));
  },

  async deleteComment(comment: CommentType) {
    await deleteDoc(doc(db, "comments", comment.id));
  },

  async deleteReply(reply: ReplyType) {
    await deleteDoc(doc(db, "replies", reply.id));
  },
};
