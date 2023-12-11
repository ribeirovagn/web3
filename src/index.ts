import axios from 'axios';
import 'dotenv/config'

const url = `${String(process.env.PROVIDER_API_URL)}?module=contract&action=getabi&address=${String(process.env.ADDRESS_CONTRACT)}&apikey=${String(process.env.PROVIDER_API_KEY)}`;
const getAbi = async () => {
    const res = await axios.get(url);
    
    if(res.data.message == 'NOTOK') {
        throw new Error(res.data.result);        
    }

    const abi = JSON.parse(res.data.result);
    console.log(abi)
    
}

getAbi();