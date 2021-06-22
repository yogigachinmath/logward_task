import React, { useRef } from 'react';
import styled from 'styled-components';

const CommentInput = styled.input`
  width: 90%;
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  margin: 1rem 2rem 1rem 1rem;
  float: right;
  background-color: #0094ff;
  border-radius: 0.25rem;
  border: none;
  padding: 0.5rem 1.5rem;
  color: white;
`;

const CommentForm = styled.div`
  background-color: #f6f6f6;
  width: 100%;
`;

function UserInput({ Add, sectionType, commentId }) {
  const nameRef = useRef('');
  const commentRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const comment = commentRef.current.value;
    Add(name, comment, commentId);
    nameRef.current.value = '';
    commentRef.current.value = '';
    e.target.reset();
  };

  return (
    <CommentForm>
      <form onSubmit={handleSubmit}>
        <h3 style={{ padding: '1rem' }}>{sectionType}</h3>
        <CommentInput ref={nameRef} type="text" placeholder="Name" name="name" required />
        <CommentInput
          ref={commentRef}
          placeholder={sectionType}
          name="comment"
          style={{ height: '5rem' }}
          required
        />
        <Button type="submit">POST</Button>
      </form>
    </CommentForm>
  );
}

export default UserInput;
