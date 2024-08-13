export function formatPrice(value) {
  if (typeof value !== "number" && typeof value !== "string") {
    return "";
  }

  const [integerPart, decimalPart] = value.toString().split(".");
  const formattedInteger = parseInt(integerPart).toLocaleString("en-US");

  // Зберігаємо всі 18 десяткових знаків, якщо вони є
  const formattedDecimal = (decimalPart || "")
    .padEnd(decimalPart ? `${decimalPart}`.toString().length || 2 : 2, "0")
    .slice(0, decimalPart ? `${decimalPart}`.toString().length || 2 : 2);

  return `$${formattedInteger}.${formattedDecimal}`;
}
