import apiRequest from '.';
export const addReview = async (payload) => {
  return apiRequest({
    method: 'POST',
    endPoint: '/api/reviews/add',
    payload,
  });
};
