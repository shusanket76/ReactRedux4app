import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import { useUpdatePostMutation, useDeletePostMutation } from "./postSlice";
import React from "react";

const EditPostForm = () => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useUpdatePostMutation();
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, postId));

  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  if (!post) {
    return (
      <>
        <h1>fom NOT FOUND</h1>
      </>
    );
  }
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);
  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post`);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id });
      setTitle("");
      setContent("");
      setUserId("");
      navigate(`/post`);
    } catch (error) {
      console.error(error);
    }
  };
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <>
      <div>EDIT POST</div>
      <form>
        <label htmlFor="postTitle">POST TITLE</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChange}
        ></input>

        <label htmlFor="postContent">CONTENT:</label>
        <input
          id="postContent"
          value={content}
          onChange={onContentChange}
        ></input>
        <label htmlFor="postAuthor">AUTHOR:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onAuthorChange}>
          <option value=""></option>

          {userOptions}
        </select>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          SAVE
        </button>
        <button type="button" onClick={onDeletePostClicked} disabled={!canSave}>
          DELETE
        </button>
      </form>
    </>
  );
};

export default EditPostForm;
