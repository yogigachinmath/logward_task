import React, { useState } from 'react';
import styled from 'styled-components';
import UserInput from './UserInput';
import { Link, DeleteBin, DeleteButton } from '../util';

const CommentContainer = styled.div`
  background-color: #f6f6f6;
  margin-top: 1rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  position: relative;
`;

const ReplyInputContainer = styled.div`
  background-color: #f6f6f6;
  width: 80%;
  align-self: end;
  margin-top: 1rem;
`;

const getDate = (date) => {
  const formattedDate = new Date(date);
  const month = formattedDate.toLocaleString('default', { month: 'short' });
  return formattedDate.getDate() + ' ' + month + ' ' + formattedDate.getFullYear();
};

function Comment({ comment, updateComment, commentId, AddReply, deleteComment }) {
  console.log({ commentId });
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [commentText, setCommentText] = useState(comment.comment);

  const handleUpdateCancel = () => {
    setIsEdit(!isEdit);
    setCommentText(comment.comment);
  };

  const handleUpdatedSave = () => {
    setIsEdit(!isEdit);
    updateComment(commentText, commentId);
  };

  return (
    <>
      <CommentContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>{comment.name}</h5>
          <span>{getDate(comment.date)}</span>
        </div>
        <span>
          <div style={{ display: isEdit ? 'flex' : 'none' }}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button style={{ margin: '0rem 1rem' }} onClick={handleUpdatedSave}>
              Save
            </button>
            <button onClick={handleUpdateCancel}>Cancel</button>
          </div>
          <div style={{ display: !isEdit ? 'flex' : 'none' }}>{comment.comment}</div>
        </span>
        <div style={{ marginTop: '2rem', display: 'flex' }}>
          <Link onClick={() => setIsReplyOpen(!isReplyOpen)} role="button">
            REPLY
          </Link>
          <Link onClick={() => setIsEdit(!isEdit)} role="button">
            EDIT
          </Link>
        </div>
        <DeleteBin>
          <DeleteButton onClick={() => deleteComment(commentId)}>
            <img src="/delete-bin.png" alt="delete" />
          </DeleteButton>
        </DeleteBin>
      </CommentContainer>
      <ReplyInputContainer style={{ display: isReplyOpen ? 'flex' : 'none' }}>
        <UserInput Add={AddReply} sectionType="REPLY" commentId={commentId} />
      </ReplyInputContainer>
    </>
  );
}

export default Comment;
