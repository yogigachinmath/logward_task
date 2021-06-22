import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, DeleteBin, DeleteButton } from '../util';

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 8rem;
  width: 100%;
  background-color: #f6f6f6;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  position: relative;
`;

const getDate = (date) => {
  const formattedDate = new Date(date);
  const month = formattedDate.toLocaleString('default', { month: 'short' });
  return formattedDate.getDate() + ' ' + month + ' ' + formattedDate.getFullYear();
};

function Replies({ reply, updateReply, commentId, replyId, deleteReply }) {
  const [isEdit, setIsEdit] = useState(false);
  const [replyText, setReplyText] = useState(reply.reply);

  useEffect(() => {
    setReplyText(reply.reply)
  }, [reply])

  const handleUpdateCancel = () => {
    setIsEdit(!isEdit);
    setReplyText(reply.reply);
  };

  const handleUpdatedSave = () => {
    setIsEdit(!isEdit);
    updateReply(replyText, commentId, replyId);
  };

  return (
    <>
      <ReplyContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>{reply.name}</h5>
          <span>{getDate(reply.date)}</span>
        </div>
        <span>
          <div style={{ display: isEdit ? 'flex' : 'none' }}>
            <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} />
            <button style={{ margin: '0rem 0.5rem' }} onClick={handleUpdatedSave}>
              Save
            </button>
            <button onClick={handleUpdateCancel}>Cancel</button>
          </div>
          <div style={{ display: !isEdit ? 'flex' : 'none' }}>{reply.reply}</div>
        </span>
        <div style={{ marginTop: '2rem', display: 'flex' }}>
          <Link onClick={() => setIsEdit(!isEdit)} role="button">
            EDIT
          </Link>
        </div>
        <DeleteBin>
          <DeleteButton onClick={() => deleteReply(commentId, replyId)}>
            <img src="/delete-bin.png" alt="delete" />
          </DeleteButton>
        </DeleteBin>
      </ReplyContainer>
    </>
  );
}

export default Replies;
