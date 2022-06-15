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

export default {
    getRecruitmentList
}
