import {
  Account,
  transactions,
  providers,
  DEFAULT_FUNCTION_CALL_GAS,
  u8,
  i8,
  u16,
  i16,
  u32,
  i32,
  u64,
  i64,
  f32,
  f64,
  BN,
  ChangeMethodOptions,
  ViewFunctionOptions,
} from './helper';

export interface Config {
  version: string;
  value: string;
}

export class Contract {
  
  constructor(public account: Account, public readonly contractId: string){}
  
  async init(args = {}, options?: ChangeMethodOptions): Promise<void> {
    return providers.getTransactionLastResult(await this.initRaw(args, options));
  }
  initRaw(args = {}, options?: ChangeMethodOptions): Promise<providers.FinalExecutionOutcome> {
    return this.account.functionCall({contractId: this.contractId, methodName: "init", args, ...options});
  }
  initTx(args = {}, options?: ChangeMethodOptions): transactions.Action {
    return transactions.functionCall("init", args, options?.gas ?? DEFAULT_FUNCTION_CALL_GAS, options?.attachedDeposit ?? new BN(0))
  }
  config(args = {}, options?: ViewFunctionOptions): Promise<Config> {
    return this.account.viewFunction(this.contractId, "config", args, options);
  }
  async update_config(args: {
    value: string;
  }, options?: ChangeMethodOptions): Promise<Config> {
    return providers.getTransactionLastResult(await this.update_configRaw(args, options));
  }
  update_configRaw(args: {
    value: string;
  }, options?: ChangeMethodOptions): Promise<providers.FinalExecutionOutcome> {
    return this.account.functionCall({contractId: this.contractId, methodName: "update_config", args, ...options});
  }
  update_configTx(args: {
    value: string;
  }, options?: ChangeMethodOptions): transactions.Action {
    return transactions.functionCall("update_config", args, options?.gas ?? DEFAULT_FUNCTION_CALL_GAS, options?.attachedDeposit ?? new BN(0))
  }
}
/**
* 
* @contractMethod change
*/
export interface Init {
  args: {};
  options: {
    /** Units in gas
    * @pattern [0-9]+
    * @default "30000000000000"
    */
    gas?: string;
    /** Units in yoctoNear
    * @default "0"
    */
    attachedDeposit?: Balance;
  }
  
}
export type Init__Result = void;
/**
* 
* @contractMethod view
*/
export interface Config {
  args: {};
  
}
export type Config__Result = Config;
/**
* 
* @contractMethod change
*/
export interface UpdateConfig {
  args: {
    value: string;
  };
  options: {
    /** Units in gas
    * @pattern [0-9]+
    * @default "30000000000000"
    */
    gas?: string;
    /** Units in yoctoNear
    * @default "0"
    */
    attachedDeposit?: Balance;
  }
  
}
export type UpdateConfig__Result = Config;
