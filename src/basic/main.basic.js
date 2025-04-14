import { saleInit, eventInit, updateCart, renderInit } from './utils';

function initApp() {
  renderInit();
  eventInit();
  saleInit();
}

function main() {
  initApp();

  updateCart();
}

main();
