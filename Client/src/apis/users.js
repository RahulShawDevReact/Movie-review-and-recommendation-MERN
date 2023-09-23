import apiRequest from '.';
export const  registerUser=async(payload)=>{
    console.log("payload",payload)
    return await apiRequest({
        method:'POST',
        endPoint:'/api/users/register',
        payload
    })
}

export const  loginUser=async(payload)=>{
    return await apiRequest({
        method:'POST',
        endPoint:'/api/users/login',
        payload
    })
}

export const GetCurrentUser= async(payload)=>{
    return await apiRequest({
        method:'GET',
        endPoint:'/api/users/get-current-user',
        payload
    })

}