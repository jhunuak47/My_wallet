import { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    const response = await fetch('/api/get_balance');
    const data = await response.json();
    setBalance(data);
  };

  const sendTokens = async (amount) => {
    const response = await fetch('/api/send_tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    if (response.ok) {
      await fetchBalance();
    }
  };

  return (
    <div>
      <h1>Token Wallet</h1>
      <p>Balance: {balance}</p>
      <button onClick={() => sendTokens(10)}>Send 10 Tokens</button>
      <button onClick={fetchBalance}>Refresh Balance</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
