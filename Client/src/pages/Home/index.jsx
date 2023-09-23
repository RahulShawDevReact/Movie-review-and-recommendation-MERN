import React from 'react'
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const {user}=useSelector((state)=>state.users)
  return (
    <div>{user?.name}</div>
  )
}

export default Home