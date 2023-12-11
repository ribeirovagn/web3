export default interface IProvider {

    getContract(address: string): Promise<any>;
    getAbi(address: string): Promise<any>;

}