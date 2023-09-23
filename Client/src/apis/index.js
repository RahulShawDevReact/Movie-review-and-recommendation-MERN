import axios from 'axios';
const apiRequest= async({method,endPoint,payload,queryString})=>{
    console.log("1111111111",{method,endPoint,payload,queryString})
try {
    console.log("222222222222")
    const response=await axios({
        method,
        url:endPoint,
        data:payload,
        params:queryString,
        headers:{
            authorization:`Bearer ${localStorage.getItem("token")}`
        }
    });
    console.log("33333333",response)
    return response.data;
} catch (error) {
    //error specific handling
    console.log("error==",error)
    throw new Error(error.response.data.message || error.message || 'Something went wrong')
}
       
        
    }


export default apiRequest;