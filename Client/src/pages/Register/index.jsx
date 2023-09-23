
import { Button, Form, message } from 'antd'
import { Link } from 'react-router-dom';
import { registerUser } from '../../apis/users';
import { useNavigate } from 'react-router-dom';
import { antValidatioError } from '../../helpers';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/loadersSlice';

const Register = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onSubmit = async(values) => {    
    try {
      console.log("values--------------",values)
      dispatch(setLoading(true))
      const response=await registerUser(values)
      dispatch(setLoading(false))
      console.log("resp",response)
      message.success(response.message)
      navigate('/login')
    } catch (error) {
      console.log("err",error)
      dispatch(setLoading(false))

      message.error(error.message)
    }
  };
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[])
  return (
    <>
      <div className='grid grid-cols-2 h-screen'>
        <div className='bg-primary flex flex-col items-center justify-center'>
          <div>
                <h1 className='text-6xl text-orange-500 font-semibold'>Welcome to Movie World</h1>
                <span className='text-xl text-gray-400 mt-2'>One stop for all your movie review,ratings and recommendations.</span>

          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='w-1/2'>
            <h1 className='text-2xl'>Register in to acoount</h1>
            <hr />
            <Form layout='vertical' className='flex flex-col gap-5' onFinish={onSubmit}>
            <Form.Item label="Name" name="name" rules={antValidatioError}>
                <input />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={antValidatioError}>
                <input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={antValidatioError}>
                <input />
              </Form.Item>
              <div className='flex flex-col gap-5'>
              <Button type='primary' htmlType='submit' block >Register</Button>
              <Link to="/login">
               Already have an account ? Login here
              </Link>
            </div>
            </Form>
           
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;