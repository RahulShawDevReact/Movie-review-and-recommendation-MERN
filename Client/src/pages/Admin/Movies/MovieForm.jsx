import { Button, Form, Select, Tabs, message } from "antd";
import Item from "antd/es/list/Item";
import { useCallback, useEffect, useState } from "react";
import { antValidatioError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../../redux/loadersSlice";
import { GetAllArtists } from "../../../apis/artists";
import { AddMovie, GetMovieById } from "../../../apis/movies";

function MovieForm() {
  const [artists, setArtists] = useState();
  // const [movie,setMovies]=useState({});
  const [movie,setMovies]=useState()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params=useParams()
  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await AddMovie(values);
      // naviagte("/admin/movies")
      dispatch(setLoading(false));
      message.success(response.message);
      navigate("/admin")
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
    console.log("hello",values)
  };

  const fetchAllArtists = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllArtists();
      setArtists(
        response.data.map((artist) => ({
          value: artist._id,
          label: artist.name,
        }))
      );
      dispatch(setLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };
  const getMovieById=async(id)=>{
    try {
      dispatch(setLoading(true));
      const response = await GetMovieById(id);
      console.log("res11===============",response)
      setMovies(response.data)
      console.log("movie=============",movie)
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  }
  const fetchData = useCallback(async()=> {
    console.log("params",params)
    if(params.id)
    {console.log("---------------------------------------------------")
       getMovieById(params.id)
      console.log("======================================================")
    }
    console.log("movie1111",movie)
  }, [])
  useEffect(() => {
    fetchAllArtists();
  }, []);
  useEffect(()=>{
    fetchData()

  },[fetchData])
  return (
  (movie || !params.id) && <div>
      <div className="flex justify-between items-center ">
        <h1 className="text-gray-600 text-xl font-semibold">{movie ? "Update Movie" : "Add Movie"}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          onClick={() => navigate("/admin")}
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 justify-end"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <Tabs>
        <Item tab="Details" key="1">
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
            initialValues={movie}
          >
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Name"
                name="name"
                rules={antValidatioError}
                className="col-span-2"
              >
                <input />
              </Form.Item>
              <Form.Item
                label="Release Date"
                name="releaseDate"
                rules={antValidatioError}
              >
                <input type="date" />
              </Form.Item>
            </div>
            <Form.Item label="Plot" name="plot" rules={antValidatioError}>
              <textarea />
            </Form.Item>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Hero"
                name="hero"
                rules={antValidatioError}
                className="col-span-1"
              >
                <Select showSearch options={artists}></Select>
              </Form.Item>
              <Form.Item
                label="Heroine"
                name="heroine"
                rules={antValidatioError}
              >
                <Select showSearch options={artists}></Select>
              </Form.Item>
              <Form.Item
                label="Director"
                name="director"
                rules={antValidatioError}
              >
                <Select showSearch options={artists}></Select>
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Genre"
                name="genre"
                rules={antValidatioError}
                className="col-span-1"
              >
                <Select
                  showSearch
                  options={[
                    {
                      value: "action",
                      label: "Action",
                    },
                    {
                      value: "comedy",
                      label: "Comedy",
                    },
                    {
                      value: "drama",
                      label: "Drama",
                    },
                    {
                      value: "horror",
                      label: "Horror",
                    },
                    {
                      value: "romance",
                      label: "Romance",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Language"
                name="language"
                rules={antValidatioError}
              >
                <Select
                  showSearch
                  options={[
                    {
                      value: "english",
                      label: "English",
                    },
                    {
                      value: "telegu",
                      label: "Telegu",
                    },
                    {
                      value: "hindi",
                      label: "Hindi",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Trailer"
                name="trailer"
                rules={antValidatioError}
              >
                <input type="text" />
              </Form.Item>
            </div>
            <Form.Item
              label="Cast & Crew"
              name="cast"
              rules={antValidatioError}
            >
              <Select mode="tags" options={artists}></Select>
            </Form.Item>
            <div className="flex justify-end gap-5">
              <Button onClick={() => navigate("/admin")}>Cancel</Button>
              <Button htmlType="submit" type="primary" >
                Save
              </Button>
            </div>
          </Form>
        </Item>
        <Item tab="Poster" key="2">
          <h1>ddd</h1>
        </Item>
      </Tabs>
    </div>
  );
}

export default MovieForm;
