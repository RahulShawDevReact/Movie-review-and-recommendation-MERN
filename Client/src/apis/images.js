import apiRequest from '.';


export const UploadImage=async(payload)=>{
    console.log("payload==",payload)
    return await apiRequest({
        method:'POST',
        endPoint:'/api/images/upload-image',
        payload
    });
};
