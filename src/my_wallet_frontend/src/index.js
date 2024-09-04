import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(10); // Default token amount

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/get_balance');
      const data = await response.json();
      setBalance(data);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
    setLoading(false);
  };

  const sendTokens = async () => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error('Failed to send tokens:', error);
    }
    setLoading(false);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
        padding: 2 
      }}
    >
      <Card sx={{ maxWidth: 400, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Token Wallet
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
            Balance: {loading ? <CircularProgress size={24} /> : balance}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              type="number"
              label="Amount to Send"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              fullWidth
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={sendTokens}
              disabled={loading}
            >
              Send Tokens
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={fetchBalance}
              disabled={loading}
            >
              Refresh Balance
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
