import axios from "axios";
import address from '../tools/Address';

const getBoardList = async()=> {
    try{
        const result = await axios.get(`${address}/board`,{
        });
        return result;
      }catch(err){
        console.log(err)
      }
}
const postBoard =  async(userIdx, userRole, subject, content)=> {
  try{
    const result = await axios.post(`${address}/board`, {
      userIdx : userIdx,
      userRole : userRole,
      subject : subject,
      content : content
    });
    return result;
  }catch(err){
    console.log(err)
  }
}
const getComment = async(boardIdx)=> {
    try{
        const result = await axios.get(`${address}/bcomment/${boardIdx}`,{
        });
        return result;
      }catch(err){
        console.log(err)
      }
}

const postBoardComment =  async(userIdx, boardIdx, comment)=> {
  try{
    const result = await axios.post(`${address}/bcomment`,{
      userIdx : userIdx,
      boardIdx : boardIdx,
      comment : comment
    });
    return result;
  }catch(err){
    console.log(err)
  }
}



export default {
    getBoardList, getComment,
    postBoardComment, postBoard
}
