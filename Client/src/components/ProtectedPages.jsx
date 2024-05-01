import { useEffect } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apis/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice";
import { setLoading } from "../redux/loadersSlice";

function ProtectedPage({ children }) {
  // const [user, setUser] = useState(null);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const {user}=useSelector((state)=>state.users)
 
  //here setting the data to redux store
  const getCurrentUser = async () => {
    try {
      console.log("get current user==============");
      dispatch(setLoading(true))
      const response = await GetCurrentUser();
      dispatch(setLoading(false))
      // setUser(response.data);
      dispatch(setUser(response.data))
    } catch (error) {
      dispatch(setLoading(false))
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center bg-primary p-5">
        <span className="font semibold text-orange-500 text-2xl cursor-pointer" onClick={()=>{
            navigate("/")}} >
          Movie World
        </span>
        <div className="bg-white rounded px-5 py-2 flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-primary text-sm cursor-pointer underline"  onClick={()=>{
            navigate("/profile")
          }}>{user?.name}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w.-6 h-6"
            onClick={()=>{
              localStorage.removeItem('token');
              navigate('/login')
            }}
           
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </div>
      </div>
      {user && <div className="p-5">{children}</div>}
    </div>
  );
}
export default ProtectedPage;
