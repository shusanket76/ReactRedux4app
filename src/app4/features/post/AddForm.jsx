import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postSlice";

import React from "react";

const AddForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setuserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setuserId(e.target.value);
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus == "idle";
  const onSavedPostClick = () => {
    try {
      if (canSave) {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setuserId("");
      }
    } catch (error) {
      console.error("FAILED TO SAVE THE POST", error);
    } finally {
      setAddRequestStatus("idle");
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
