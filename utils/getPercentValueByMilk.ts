// CALCULO MARGEM SOBRE ALIMENTAÇÃO COM BASE NO PREÇO DO LEITE

const getPercentValueByMilk = (
  percentValue: number,
  key: string,
  kpis: any[],
) => {
  const foundKPIMilkPrice = kpis.find((kpi: any) => kpi.key === "preco_leite");

  if (foundKPIMilkPrice) {
    // PARSE % VALUE IN TO DECIMAL
    const percentValueToDecimal = percentValue / 100;
    const decimalValue = parseFloat(percentValueToDecimal.toFixed(2));

    // DIVISION OF DECIMAL VALUE WITH MILK PRICE, PARSE DECIMAL IN TO %
    const decimalValueByMilkPrice = decimalValue / foundKPIMilkPrice[key];
    const decimalValueToPercent = decimalValueByMilkPrice * 100;
    const value = parseFloat(decimalValueToPercent.toFixed(2));

    return value;
  }

  return 0;
};

export default getPercentValueByMilk;
