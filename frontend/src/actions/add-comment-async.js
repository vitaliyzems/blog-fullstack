import { request } from '../utils';
import { addComment } from './add-comment';

export const addCommentAsync = (postId, content) => (dispatch) =>
  request(`/api/posts/${postId}/comments`, 'POST', { content }).then(
    ({ data }) => {
      dispatch(addComment(data));
    }
  );
