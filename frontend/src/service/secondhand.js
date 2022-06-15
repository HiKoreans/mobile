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

export default {
    getSecondhandList,  getComment
}
