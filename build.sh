 #!/bin/bash
 TARGET="${CARGO_TARGET_DIR:-target}"
 set -e
 cd "`dirname $0`"
 RUSTFLAGS='-C link-arg=-s'  cargo build --all --target wasm32-unknown-unknown --release


 cp $TARGET/wasm32-unknown-unknown/release/witgen_template.wasm ./res/

