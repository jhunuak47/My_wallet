use candid::CandidType;  
use ic_cdk_macros::{init, query, update};
use std::cell::RefCell;


#[derive(Default, CandidType)]
struct Wallet {
    balance: RefCell<u64>,
}


thread_local! {
    static WALLET: RefCell<Wallet> = RefCell::new(Wallet::default());
}


#[init]
fn init() {
    ic_cdk::print("Wallet initialized");
}

// Update method to send tokens
#[update]
fn send_tokens(amount: u64) -> String {
    WALLET.with(|wallet| {
        let wallet = wallet.borrow_mut();
        let current_balance = *wallet.balance.borrow();
        if amount > current_balance {
            return "Insufficient balance".to_string();
        }
        *wallet.balance.borrow_mut() -= amount;
        "Tokens sent successfully".to_string()
    })
}

// Update method to receive tokens
#[update]
fn receive_tokens(amount: u64) {
    WALLET.with(|wallet| {
        *wallet.borrow_mut().balance.borrow_mut() += amount;
    })
}

// Query method to get the current balance
#[query]
fn get_balance() -> u64 {
    WALLET.with(|wallet| {
        *wallet.borrow().balance.borrow()
    })
}
