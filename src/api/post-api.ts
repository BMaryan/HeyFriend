import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { CommentType, PostType } from "../types/types";
import { db } from "../firebase";

export const postAPI = {
  async createPost(post: PostType) {
    const res = await addDoc(collection(db, "posts"), { ...post });

    await updateDoc(doc(db, "posts", res.id), { ...post, id: res.id });
  },

  async createComment(comment: CommentType) {
    const res = await addDoc(collection(db, "comments"), { ...comment });

    await updateDoc(doc(db, "comments", res.id), { ...comment, id: res.id });
  },

  async updatePost(post: PostType) {
    await updateDoc(doc(db, "posts", post.id), { ...post });
  },

  async updateComment(comment: CommentType) {
    await updateDoc(doc(db, "comments", comment.id), { ...comment });
  },

  async deletePost(post: PostType) {
    await deleteDoc(doc(db, "posts", post.id));
  },

  async deleteComment(comment: CommentType) {
    await deleteDoc(doc(db, "comments", comment.id));
  },
};
