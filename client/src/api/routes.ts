const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const routes = {
  marketDepth: (marketPair: String) => `${baseUrl}/market-depth/${marketPair}`,
};
