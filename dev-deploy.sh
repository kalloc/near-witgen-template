#!/usr/bin/env bash

set -e
export NEAR_ENV=testnet

realpath() {
    path=`eval echo "$1"`
    folder=$(dirname "$path")
    echo $(cd "$folder"; pwd)/$(basename "$path");
}

./build.sh

ROOT=$(dirname $(realpath $0))
if [[ ! -e ${ROOT}/neardev ]]; then
    INIT_TIME=true
fi
near dev-deploy --wasmFile ${ROOT}/res/contract.wasm  --initFunction ''
CONTRACT=$(cat ${ROOT}/neardev/dev-account)
if [[ $INIT_TIME ]];then
    near call ${CONTRACT} init '{}' --accountId $CONTRACT
fi
