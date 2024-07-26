const formatBatchName = (
  key: string,
  withSpace?: boolean,
  lowerCase?: boolean,
) => {
  if (lowerCase) {
    if (withSpace) {
      return `lote ${key.toUpperCase()}`;
    }
    return `lote${key.toUpperCase()}`;
  }

  if (withSpace) {
    return `Lote ${key.toUpperCase()}`;
  }

  return `Lote${key.toUpperCase()}`;
};

export default formatBatchName;
