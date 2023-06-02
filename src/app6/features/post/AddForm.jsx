import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { useAddNewPostMutation } from "./postSlice";
import { useNavigate } from "react-router-dom";

import React from "react";
import { add } from "date-fns";

const AddForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setuserId] = useState("");
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const users = useSelector(selectAllUsers);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setuserId(e.target.value);
  const canSave = [title, content, userId].every(Boolean) && !isLoading;
  const onSavedPostClick = async () => {
    try {
      if (canSave) {
        await addNewPost({ title, body: content, userId }).unwrap();
        setTitle("");
        setContent("");
        setuserId("");
        navigate("/post");
      }
    } catch (error) {
      console.error("FAILED TO SAVE THE POST", error);
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <>
      <h1>ADD A NEW POST</h1>
      <form>
        <label htmlFor="postTitle">POST TITLE:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        ></input>
        <label htmlFor="postContent">POST TITLE:</label>
        <input
          type="text"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        ></input>
        <label htmlFor="postAuthor">AUTHOR:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <button type="button" onClick={onSavedPostClick} disabled={!canSave}>
          ADD
        </button>
      </form>
    </>
  );
};

export default AddForm;
