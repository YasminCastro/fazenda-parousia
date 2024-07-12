const formatBatchName = (key: string, withoutSpace?: boolean) => {
  if (withoutSpace) {
    return `Lote${key.toUpperCase()}`;
  }

  return `Lote ${key.toUpperCase()}`;
};

export default formatBatchName;
