export const cartStore = {
  selectedProduct: undefined,
  setSelectedProduct(selectedProduct) {
    this.selectedProduct = selectedProduct;
  },
  getSelectedProduct() {
    return this.selectedProduct;
  },
};
