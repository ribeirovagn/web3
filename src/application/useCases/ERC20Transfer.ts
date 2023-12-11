import Contract from "./Contract";
import Provider from "../../infra/web3/Provider";
import IProvider from "../IContract";

export default class ERC20Transfer {
    constructor(readonly contractRepository: IProvider) { }

    async execute(input: Input) {

        const provider = Provider.getInstance();
        const connectionProvider = await provider.init();
        const addressFrom = connectionProvider.eth.accounts.privateKeyToAccount(input.from);

        const _contractRepository = new Contract(this.contractRepository);
        const contract = await _contractRepository.execute(input.address);

        const decimals = parseInt(await contract.methods.decimals().call());
        const balanceOf = await contract.methods.balanceOf(addressFrom.address).call();
        const value = connectionProvider.utils.toBigInt(input.amount * Math.pow(10, decimals));


        if (balanceOf >= value) {
            var rawTransaction = {
                from: addressFrom.address,
                gasPrice: await connectionProvider.eth.getGasPrice(),
                gasLimit: connectionProvider.utils.toHex(210000),
                to: input.address,
                value: "0x0",
                data: contract.methods.transfer(input.to, value).encodeABI()
            }

            const signTransaction = await connectionProvider.eth.accounts.signTransaction(rawTransaction, input.from);
            const sendTx = await connectionProvider.eth.sendSignedTransaction(signTransaction.rawTransaction);
            return sendTx;
        }

        throw new Error("Saldo inferior ao valor de tranferencia");
        

    }
}

type Input = {
    address: string,
    from: Uint8Array | string, // PRIVATE_KEY
    to: string,
    amount: number
}
