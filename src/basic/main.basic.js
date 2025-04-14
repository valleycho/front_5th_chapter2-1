import { saleInit, eventInit, calcCart, renderInit } from './utils';

function initApp() {
  renderInit();
  eventInit();
  saleInit();
}

function main() {
  initApp();

  calcCart();
}

main();
