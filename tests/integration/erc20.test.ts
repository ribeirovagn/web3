import Contract from "../../src/application/useCases/Contract";
import ERC20Transfer from "../../src/application/useCases/ERC20Transfer";
import ContractRepository from "../../src/infra/web3/ContractRepository";
import 'dotenv/config'

test("Deve recuperar um ERC-20", async () => {
    const contractRepository = new ContractRepository();
    const contractUseCase = new Contract(contractRepository);
    const contract = await contractUseCase.execute(String(process.env.ADDRESS_CONTRACT))

    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const decimals = await contract.methods.decimals().call();

    expect(name).toBe("W3D Test");
    expect(symbol).toBe("W3DT");
    expect(decimals).toBe(BigInt(18));


}, 10000);

test("Envia ERC-20 de um address para outro", async () => {
    const contractRepository = new ContractRepository();
    const erc20Transfer = new ERC20Transfer(contractRepository);


    const input = {
        address: String(process.env.ADDRESS_CONTRACT),
        from: String(process.env.PRIVATE_KEY),
        to: String(process.env.ADDRESS_TO),
        amount: 0.01256
    }

    const tranfer = await erc20Transfer.execute(input);
    expect(tranfer.to).toBe(String(process.env.ADDRESS_CONTRACT).toLowerCase());

}, 40000);