import axios from 'axios';
import Provider from "./Provider";
import IProvider from "../../application/IContract";

export default class ContractRepository implements IProvider {
    private provider: any;

    constructor() {
        this.provider = Provider.getInstance();
    }

    async connection() {
        return await this.provider.init();
    }

    async getContract(address: string): Promise<any> {
        const provider = await this.connection();
        const abi = await this.getAbi(address);
        return new provider.eth.Contract(abi, address);
    }

    async getAbi(address: string): Promise<any> {
        const url = `${String(process.env.PROVIDER_API_URL)}?module=contract&action=getabi&address=${String(process.env.ADDRESS_CONTRACT)}&apikey=${String(process.env.PROVIDER_API_KEY)}`;

        const res = await axios.get(url);

        if (res.data.message == 'NOTOK') {
            throw new Error(res.data.result);
        }

        const abi = JSON.parse(res.data.result);
        return abi;

    }
}