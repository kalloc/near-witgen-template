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
yarn run deploy test
```


## Example 

```typescript
import { Context } from "near-cli/context";
import fs from "fs";
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
