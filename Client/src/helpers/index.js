import moment from "moment"

//validation for forms for required
export const antValidatioError=[{
    "message":"Required",
    required:true
}]

export const getDateFormat=(date)=>{
    return moment(date).format("MMM Do YYYY");  
}

export const getDateTimeFormat=(date)=>{
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");  
}