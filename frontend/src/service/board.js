import axios from "axios";

const address = 'http://172.30.1.59:8080'

const getBoardList = async()=> {
    try{
        const result = await axios.get(`${address}/board`,{
        });
        return result;
      }catch(err){
        console.log(err)
      }
}
const getSecondhandList = async()=> {
    try{
      const result = await axios.get(`${address}/secondhand`,{
      });
      return result;
    }catch(err){
      console.log(err)
    }
}
const getRecruitmentList = async()=> {
    try{
      const result = await axios.get(`${address}/recruitment`,{
      });
      console.log(result)
      return result;
    }catch(err){
      console.log(err)
    }
}


export default {
    getBoardList, getRecruitmentList, getSecondhandList
}
