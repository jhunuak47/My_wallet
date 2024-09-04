use ic_cdk::api::call::call;
use ic_cdk::export::Principal;
use crate::lib::*;

#[test]
fn test_send_tokens() {
    let sender = Principal::from_text("sender-principal-id").unwrap();
    let receiver = Principal::from_text("receiver-principal-id").unwrap();
    
    let result = send_tokens(receiver, 100);
    assert!(result.is_ok());
    
    let balance = get_balance();
    assert_eq!(balance, 100);
}
