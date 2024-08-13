export function getRandomNumber(min, max) {
  const random = Math.random() * (max - min) + min;
  return parseFloat(random.toFixed(2));
}
