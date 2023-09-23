import apiRequest from ".";

export const AddMovie = async (payload) => {
  console.log("payload==", payload);
  return await apiRequest({
    method: "POST",
    endPoint: "/api/movies/add-movie",
    payload,
  });
};

export const GetAllMovies = async () => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/movies/",
  });
};

export const GetMovieById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/movies/${id}`,
  });
};
export const UpdateMovie = async (id, data) => {
  console.log("payload==", data);
  return await apiRequest({
    method: "PUT",
    endPoint: `/api/movies/${id}`,
    payload: data,
  });
};

export const DeleteMovie = async (id) => {
  console.log("axios de;lete called",id)
  return await apiRequest({
    method: "DELETE",
    endPoint: `/api/movies/${id}`,
  });
};
