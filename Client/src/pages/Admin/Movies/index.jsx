import { Button, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/loadersSlice";
import { DeleteMovie, GetAllMovies } from "../../../apis/movies";
import { getDateFormat } from "../../../helpers";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllMovies = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllMovies();
      dispatch(setLoading(false));
      setMovies(response.movies);
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  const deleteMovie = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await DeleteMovie(id);
      message.success(response.message);
      await getAllMovies();
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  const columns = [
    {
      title: "Movie",
      dataIndex: "name",
      render: (text, record) => {
        console.log("record", record);
        const imageUrl = record?.posters?.[0] || "";
        console.log("imge", imageUrl);
        return <img className="w-20 h-20 rounded" src={imageUrl} alt="" />;
      },
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Relaese Date",
      dataIndex: "releaseDate",
      render: (text) => {
        return getDateFormat(text);
      },
    },
    { title: "Genre", dataIndex: "genre" },
    { title: "Language", dataIndex: "language" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        console.log("record=========in render", record);
        return (
          <div className="flex gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => {
                navigate(`/admin/movies/edit/${record._id}`);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => {
                console.log("record._id", record._id);
                deleteMovie(record._id);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-end mr-5">
        <Button onClick={() => navigate("/admin/movies/add")}>Add Movie</Button>
      </div>
      <Table dataSource={movies} columns={columns} className="m-5"></Table>
    </div>
  );
}

export default Movies;
