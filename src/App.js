import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Comment from './components/Comments';
import Replies from './components/Replies';
import UserInput from './components/UserInput';
import { Link } from './util';

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 5rem;
`;

const RepliesContainer = styled.div`
  display: flex;
  align-self: end;
  width: 80%;
  margin-top: 1rem;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1rem;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const [comments, setComments] = useState([]);
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);

  useEffect(() => {
    setComments(JSON.parse(localStorage.getItem('comments')) || []);
  }, []);

  const AddComment = (name, comment) => {
    const newComment = {
      name,
      comment,
      date: new Date(),
    };
    setComments((comments) => [...comments, newComment]);
    localStorage.setItem('comments', JSON.stringify([...comments, newComment]));
  };

  const AddReply = (name, reply, commentId) => {
    const updatedComments = [...comments];
    if (!updatedComments[commentId].reply) updatedComments[commentId].reply = [];
    updatedComments[commentId].reply.push({ name, reply, date: new Date() });
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const updateComment = (updatedComment, id) => {
    const updatedComments = comments;
    updatedComments[id].comment = updatedComment;
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const updateReply = (updatedReply, commentId, replyId) => {
    const updatedComments = [...comments];
    updatedComments[commentId].reply[replyId].reply = updatedReply;
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const deleteComment = (commentId) => {
    const updatedComments = [...comments];
    updatedComments.splice(commentId, 1);
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const deleteReply = (commentId, replyId) => {
    const updatedComments = [...comments];
    updatedComments[commentId].reply.splice(replyId, 1);
    setComments(updatedComments);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const renderComments = () => {
    const sortedComments = [...comments];
    if (isAscendingOrder) sortedComments.reverse();
    console.log(isAscendingOrder, sortedComments);
    return sortedComments.map((comment, index) => (
      <>
        <Comment
          comment={comment}
          updateComment={updateComment}
          AddReply={AddReply}
          commentId={isAscendingOrder ? sortedComments.length - index - 1 : index}
          updateReply={updateReply}
          deleteComment={deleteComment}
        />
        {comment.reply &&
          comment.reply.map((reply, replyIndex) => (
            <RepliesContainer>
              <Replies
                reply={reply}
                updateReply={updateReply}
                commentId={isAscendingOrder ? sortedComments.length - index - 1 : index}
                replyId={replyIndex}
                deleteReply={deleteReply}
              />
            </RepliesContainer>
          ))}
      </>
    ));
  };

  return (
    <AppContainer className="App">
      <CommentsContainer>
        <UserInput Add={AddComment} sectionType="Comment" />
        <SortContainer>
          <Link onClick={() => setIsAscendingOrder(!isAscendingOrder)}>
            {' '}
            Sort By: Date and Time {isAscendingOrder ? '⬆️' : '⬇️'}
          </Link>
        </SortContainer>
        {renderComments()}
      </CommentsContainer>
    </AppContainer>
  );
}

export default App;
