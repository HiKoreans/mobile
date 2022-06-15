import axios from "axios";
import address from '../tools/Address';

const signin = async(id, password)=> {
    try{
        const result = await axios.post(`${address}/signin`,{
          id : id,
          password : password
        });
        return result;
      }catch(err){
        console.log(err)
      }
}
const signup = async(id, password, email, nickName, region)=>{
    try{
        const result = await axios.post(`${address}/signup`,{
          id : id,
          pw : password,
          email : email,
          nickName : nickName,
          region : region
        });
        return result;
      }catch(err){
        console.log(err);
      }
}
export default {
    signin, signup
}
