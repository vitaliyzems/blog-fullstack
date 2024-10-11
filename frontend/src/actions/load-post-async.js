import { request } from '../utils';
import { setPostData } from './set-post-data';

export const loadPostAsync = (postId) => (dispatch) =>
  request(`/api/posts/${postId}`).then(({ error, data }) => {
    if (data) {
      dispatch(setPostData(data));
    }

    return error;
  });
