export function getDiscountRate(quantity: number, cartItemId: string): number {
  if (quantity >= 30) {
    return 0.25;
  }

  if (quantity >= 10) {
    return getProductDiscountRate(cartItemId);
  }

  return 0;
}


export function getProductDiscountRate(productId: string) {
  if (productId === 'p1') return 0.1;
  if (productId === 'p2') return 0.15;
  if (productId === 'p3') return 0.2;
  if (productId === 'p4') return 0.05;
  if (productId === 'p5') return 0.25;

  return 0;
}
