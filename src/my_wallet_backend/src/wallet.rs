use ic_cdk::storage;
use serde::{Deserialize, Serialize};

#[derive(Default, Serialize, Deserialize)]
struct Wallet {
    balance: u64,
}

#[init]
pub fn init_wallet() {
    storage::stable_save((Wallet::default(),)).expect("Failed to initialize wallet.");
}

pub fn send_tokens(to: String, amount: u64) -> String {
    let mut wallet = storage::stable_restore::<(Wallet,)>().expect("Failed to load wallet.").0;
    
    if wallet.balance < amount {
        return "Insufficient balance.".to_string();
    }

    
    wallet.balance -= amount;
    storage::stable_save((wallet,)).expect("Failed to save wallet state.");
    format!("Sent {} tokens to {}.", amount, to)
}

pub fn receive_tokens(from: String, amount: u64) {
    let mut wallet = storage::stable_restore::<(Wallet,)>().expect("Failed to load wallet.").0;

    
    wallet.balance += amount;
    storage::stable_save((wallet,)).expect("Failed to save wallet state.");
    ic_cdk::println!("Received {} tokens from {}.", amount, from);
}

pub fn get_balance() -> u64 {
    let wallet = storage::stable_restore::<(Wallet,)>().expect("Failed to load wallet.").0;
    wallet.balance
}
