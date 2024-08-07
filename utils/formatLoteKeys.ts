const formatLoteKeys = (data: any) => {
  const formattedLotes: any = {};

  for (const key in data) {
    if (data.hasOwnProperty(key) && key.startsWith("Lote")) {
      const newKey = "lote" + key.slice(5);
      formattedLotes[newKey] = data[key];
    }
  }

  return formattedLotes;
};

export default formatLoteKeys;
