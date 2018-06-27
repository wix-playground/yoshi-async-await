export function factory() {
  return {
    justDoIt: async (req, res) => {
      await new Promise(resolve => setTimeout(resolve), 1000);
      res.json('OK');
    }
  };
}
