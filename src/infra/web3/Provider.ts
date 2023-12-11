import Web3 from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

export default class Provider {

    private static instance: Provider;

    private constructor() {}

    public static getInstance(): Provider {
        if (!Provider.instance) {
            return new Provider();
        }
        return new Provider();
    }

    async init(): Promise<Web3<RegisteredSubscription>> {

        return this.createSingleton("web3-provider", () => {
            const providerUrl = String(process.env.PROVIDER_URL);
            const provider = new Web3.providers.HttpProvider(providerUrl);
            return new Web3(provider);
        })
    }

    private createSingleton<T>(name: string, create: () => T): T {
        const s = Symbol.for(name);
        let scope = (global as any)[s];
        if (!scope) {
            scope = { ...create() };
            (global as any)[s] = scope;
        }
        return scope;
    }
}