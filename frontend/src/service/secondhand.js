import axios from "axios";
import address from '../tools/Address';


const getSecondhandList = async()=> {
    try{
      const result = await axios.get(`${address}/secondhand`,{
      });
      return result;
    }catch(err){
      console.log(err)
    }
}

const getComment = async (secondhandIdx)=> {
  try{
    const result = await axios.get(`${address}/shcomment/${secondhandIdx}`,{
    });
    return result;
  }catch(err){
    console.log(err)
  }
}
const postSecondhand = async(userIdx, subject, content, price, isSelling) => {
  let type;
  if(isSelling){
    type = 1;
  }else {
    type = 0;
  }
  try{
    const result = await axios.post(`${address}/secondhand`, {
      userIdx  : userIdx,
      subject : subject,
      content : content,
      price : price,
      type : type
    })
    return result;
  }catch(err){
    console.log(err);
  }
}
const postSecondhandComment = async(userIdx, secondhandIdx, comment) => {
  try{
    const result = await axios.post(`${address}/shcomment`, {
      userIdx  : userIdx,
      secondhandIdx : secondhandIdx,
      comment : comment,
    })
    return result;
  }catch(err){
    console.log(err);
  }
}
export default {
    getSecondhandList,  getComment, postSecondhand, postSecondhandComment
}
