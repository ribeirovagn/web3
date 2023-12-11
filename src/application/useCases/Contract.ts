import ContractRepository from "../../infra/web3/ContractRepository";
import IProvider from "../IContract";

export default class Contract {


    constructor(readonly contractRepository: IProvider){}

    async execute(address: string) {
        const contract = await this.contractRepository.getContract(address);

        if(!contract) {
            throw new Error("Contrato não encontrado!");
        }

        return contract;
    }
}