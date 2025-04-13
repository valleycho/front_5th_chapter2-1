import { minute, tenSecond, thirtySecond, twentySecond } from './timeUtils';

// 번개세일
export function flashSale() {
  const randomNumber = Math.random();

  setTimeout(() => {
    setInterval(() => {
      const flashSaleItem =
        products[Math.floor(randomNumber * products.length)];

      const isSale = randomNumber < 0.3 && flashSaleItem.quantity > 0;

      if (isSale) {
        const saledPrice = Math.round(flashSaleItem.price * 0.8);
        flashSaleItem.price = saledPrice;

        alert('번개세일! ' + flashSaleItem.name + '이(가) 20% 할인 중입니다!');

        updateSelOpts();
      }
    }, thirtySecond);
  }, randomNumber * tenSecond);
}

// 추천 세일
export function recommendSale() {
  const randomNumber = Math.random();

  setTimeout(() => {
    setInterval(() => {
      if (selectedProduct) {
        const recommendSaleProduct = products.find((item) => {
          return item.id !== selectedProduct && item.quantity > 0;
        });

        if (recommendSaleProduct) {
          alert(
            recommendSaleProduct.name +
              '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!',
          );

          const saledPrice = Math.round(recommendSaleProduct.price * 0.95);
          recommendSaleProduct.price = saledPrice;

          updateSelOpts();
        }
      }
    }, minute);
  }, randomNumber * twentySecond);
}
