import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";



export const registerUser = async (userData) => {
  const response = await commonAPI('POST', `${serverURL}/api/auth/register`, userData);
  return response;
};
export const verifyOtp = async (otp, activationToken) => {
  const response = await commonAPI('POST', `${serverURL}/api/auth/verify-otp`, { otp, activationToken });
  return response;
};

export const loginUser = async (user) => {
  try {
    const response = await commonAPI('POST', `${serverURL}/api/auth/login`, user, "");
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Make sure to throw the error so it can be handled properly in the `Auth` component
  }
};



export const addProject = async (reqBody, reqHeader) => {
  return await commonAPI('POST', `${serverURL}/api/courses/courseadd`, reqBody, reqHeader);
}

export const addCourse=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/courses/add`,reqBody,reqHeader);
}

export const getallCourses = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/courses`, "",reqHeader);
}


export const createCourse=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/course/adds`,reqBody,reqHeader);
}

export const getCourses = async (reqHeader) => {
  return await commonAPI('GET', `${serverURL}/api/course/getcourse`, "", reqHeader);
}


export const addQuiz=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/quizzes/add`,reqBody,reqHeader);
}

export const getQuiz=async(reqHeader)=>{
  return await commonAPI('GET',`${serverURL}/api/quizzes/getquiz`,"",reqHeader);
}

export const submitQuiz=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/quizzes/submit`,reqBody,reqHeader);
}

export const createChallenge=async(reqBody,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/daily-challenges/create`,reqBody,reqHeader);
}

export const getChallenges=async(reqHeader)=>{
  return await commonAPI('GET',`${serverURL}/api/daily-challenges/challenges`,"",reqHeader);
}

export const submitAnswer = async (challange, formData, reqHeader) => {
  return await commonAPI('POST',`${serverURL}/api/daily-challenges/${challange}/submit`,formData,reqHeader);
};


export const adddiscussion = async (data, reqHeader) => {
  return await commonAPI('POST',`${serverURL}/api/discussions/create`,data,reqHeader);
};

export const getdiscussion = async (reqHeader) => {
  return await commonAPI('GET',`${serverURL}/api/discussions/getdiscussion`,"",reqHeader);
};

export const adddEvent = async (formData, reqHeader) => {
  return await commonAPI('POST',`${serverURL}/api/events/create`,formData,reqHeader);
};

export const getEvent = async ( reqHeader) => {
  return await commonAPI('GET',`${serverURL}/api/events/upcoming`,"",reqHeader);
};

export const addComment = async (discussionId, commentData, headers) => {
 return await commonAPI('POST',`${serverURL}/api/discussions/${discussionId}/comment`,commentData,headers);
};


export const addCalendar=async(data,reqHeader)=>{
  return await commonAPI('POST',`${serverURL}/api/calendar/create`,data,reqHeader);
}

export const getCalendar = async ( reqHeader) => {
  return await commonAPI('GET',`${serverURL}/api/calendar/calendar`,"",reqHeader);
};
