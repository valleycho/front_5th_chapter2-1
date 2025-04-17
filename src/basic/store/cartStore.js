export const cartStore = {
  selectedProduct: undefined,
  discountRate: 0,
  setSelectedProduct(selectedProduct) {
    this.selectedProduct = selectedProduct;
  },
  getSelectedProduct() {
    return this.selectedProduct;
  },
  setDiscountRate(discountRate) {
    this.discountRate = discountRate;
  },
  getDiscountRate() {
    return this.discountRate;
  },
};
