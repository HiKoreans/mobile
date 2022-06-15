import axios from "axios";
import address from '../tools/Address';


const getRecruitmentList = async()=> {
    try{
      const result = await axios.get(`${address}/recruitment`,{
      });
      return result;
    }catch(err){
      console.log(err)
    }
}

const postRecruitment = async (userIdx, subject, content)=> {
  try{
    const result = await axios.post(`${address}/recruitment`, {
      userIdx : userIdx,
      subject : subject,
      content : content
    });
    return result;
  }catch(err){
    console.log(err)
  }
}

const deleteRecruitment = async (recruitmentIdx) => {
  try{
    const result = await axios.delete(`${address}/recruitment/${recruitmentIdx}`, {});
  }catch(err){
    console.log(err);
  }
}

export default {
    getRecruitmentList, postRecruitment,
    deleteRecruitment
}
