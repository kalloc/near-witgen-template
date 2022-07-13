## Requirements 

### Install witme

```bash
cargo install witme --version 0.2.6
```

### build example
```bash
yarn && yarn build:all
```

## Usage

```bash
yarn run deploy && yarn run test
```

Expected result:

```
y@sweet ~/learn/near/witgen-template[master] $ yarn run deploy test
yarn run v1.22.18
$ ./dev-deploy.sh test
    Finished release [optimized] target(s) in 0.03s
Starting deployment. Account id: dev-1657706025241-17231575721203, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: /home/y/learn/near/witgen-template/res/contract.wasm
Transaction Id 7KTnBPVQPDcuxdTVtTjbnjiB6M3Eyjoyjsnc1mJKEeYH
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/7KTnBPVQPDcuxdTVtTjbnjiB6M3Eyjoyjsnc1mJKEeYH
Done deploying to dev-1657706025241-17231575721203
Done in 8.31s.
y@sweet ~/learn/near/witgen-template[master] $ yarn run test
yarn run v1.22.18
$ near repl -s ./test.ts
{
  version: '0.2.0',
  value: 'Wed Jul 13 2022 11:58:55 GMT+0200 (Central European Summer Time)'
}
{
  version: '0.2.0',
  value: 'Wed Jul 13 2022 12:05:20 GMT+0200 (Central European Summer Time)'
}
Done in 4.99s.

```

## Example 

```typescript
import fs from "fs";
import { Context } from "near-cli/context";

import { Contract } from "./ts/contract";


export async function main({near} : Context) {
    let contractId = fs.readFileSync("./neardev/dev-account").toString();
    let account = await near.account(contractId);
    // @ts-ignore
    let contract: Contract = new Contract(account, contractId);
    console.log(await contract.config());
    await contract.update_config({value: new Date().toString()});
    console.log(await contract.config());
}
```
