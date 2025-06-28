import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/loadersSlice';
import { Rate, message } from 'antd';
import { GetAllMovies } from '../../apis/movies';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const [movies, setMovies] = useState();

  const dispatch = useDispatch();
  const getAllMovies = async () => {
    try {
      dispatch(setLoading(true));
      const data = await GetAllMovies();
      setMovies(data.movies);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getAllMovies();
  }, []);
  console.log('ddd', movies);
  return (
    <div className='grid grid-cols-1 sm-grid-cols-2 lg:grid-cols-4 gap-10 text-gray-600'>
      {movies &&
        movies.map((movie) => {
          return (
            <div
              key={movie?._id}
              className='cursor-pointer'
              onClick={() => navigate(`/movie/${movie?._id}`)}
            >
              <img
                src={movie?.posters[0] || ''}
                alt=''
                className='h-44 w-full rounded'
              />

              <h1 className='text-xl font-semibold text-gray-600'>
                {movie?.name}
              </h1>

              <hr />

              <div className='flex justify-between text-sm'>
                <span>Language</span>
                <span className='capitalize'>{movie?.language}</span>
              </div>

              <div className='flex justify-between text-sm'>
                <span>Rating</span>
                <Rate
                  disabled
                  defaultValue={movie?.rating || 0}
                  allowHalf
                  style={{ color: 'darkred' }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
