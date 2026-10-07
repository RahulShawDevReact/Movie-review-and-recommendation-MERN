import apiRequest from '.';
export const addReview = async (payload) => {
  return apiRequest({
    method: 'POST',
    endPoint: '/api/reviews/add',
    payload,
  });
};
export const GetAllReviews = async (payload) => {
  return await apiRequest({
    method: 'GET',
    endPoint: `/api/reviews`,
    queryString: payload,
  });
};
