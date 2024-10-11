import { request } from '../utils';

export const removePostAsync = (postId) => () =>
  request(`/api/posts/${postId}`, 'DELETE');
