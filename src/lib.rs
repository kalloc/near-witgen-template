use near_sdk::{
    borsh::{BorshDeserialize, BorshSerialize},
    near_bindgen, PanicOnDefault,
};
use serde::{Deserialize, Serialize};
use witgen::witgen;

#[near_bindgen]
#[derive(Deserialize, Serialize, Debug)]
#[witgen]
pub struct Config {
    pub version: String,
    pub value: String,
}

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
struct Contract {
    pub value: String,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn init() -> Self {
        Contract {
            value: "".to_string(),
        }
    }

    #[witgen]
    pub fn config(&self) -> Config {
        Config {
            version: env!("CARGO_PKG_VERSION").to_string(),
            value: self.value.clone(),
        }
    }

    #[witgen]
    pub fn update_config(&mut self, value: String) -> Config {
        self.value = value;
        self.config()
    }
}
