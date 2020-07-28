import axios from 'axios';

interface Transaction {
  created_at: Date;
}

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(config => {
  if (config.config.url === '/transactions') {
    const transactions = config.data.transactions.map(
      (transaction: Transaction) => {
        // eslint-disable-next-line @typescript-eslint/camelcase
        return { ...transaction, created_at: new Date(transaction.created_at) };
      },
    );

    const newConfig = { ...config, data: { ...config.data, transactions } };
    return newConfig;
  }

  return config;
});

export default api;
