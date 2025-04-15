import"./modulepreload-polyfill-B5Qt9EMX.js";const m=1e3,P=10*m,R=20*m,T=30*m,E=60*m,l=Math.random(),c={products:[{id:"p1",name:"상품1",price:1e4,quantity:50},{id:"p2",name:"상품2",price:2e4,quantity:30},{id:"p3",name:"상품3",price:3e4,quantity:20},{id:"p4",name:"상품4",price:15e3,quantity:0},{id:"p5",name:"상품5",price:25e3,quantity:10}],getProducts(){return this.products},getFindProduct(t){return this.products.find(e=>e.id===t)}},C={selectedProduct:void 0,setSelectedProduct(t){this.selectedProduct=t}};function s(t,e){return Object.assign(document.createElement(t),e)}const g=s("button",{id:"add-to-cart",className:"bg-blue-500 text-white px-4 py-2 rounded",textContent:"추가"});function w(t){const e=s("div",{id:t.id,className:"flex justify-between items-center mb-2",innerHTML:`
        <span>${t.name} - ${t.price}원 x 1</span>
        <div>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${t.id}" data-change="-1">-</button>
          <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${t.id}" data-change="1">+</button>
          <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${t.id}">삭제</button>
        </div>
      `});p.appendChild(e)}function D(){const t=r.value,e=c.getFindProduct(t);if(!(((e==null?void 0:e.quantity)??0)>0))return;const o=document.getElementById(e.id);if(o){const i=parseInt(o.querySelector("span").textContent.split("x ")[1])+1;i<=e.quantity?(o.querySelector("span").textContent=`${e.name} - ${e.price}원 x ${i}`,e.quantity--):alert("재고가 부족합니다.")}else w(e),e.quantity--;x(),C.setSelectedProduct(t)}const h=s("div",{className:"bg-gray-100 p-8"}),b=s("div",{className:"max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"}),Q=s("h1",{className:"text-2xl font-bold mb-4",textContent:"장바구니"}),p=s("div",{id:"cart-items"}),y=s("div",{id:"cart-total",className:"text-xl font-bold my-4"});function $(t,e,n){var o=parseInt(t.dataset.change),i=parseInt(e.querySelector("span").textContent.split("x ")[1])+o;i>0&&i<=n.quantity+parseInt(e.querySelector("span").textContent.split("x ")[1])?(e.querySelector("span").textContent=e.querySelector("span").textContent.split("x ")[0]+"x "+i,n.quantity-=o):i<=0?(e.remove(),n.quantity-=o):alert("재고가 부족합니다.")}function S(t,e){const n=parseInt(t.querySelector("span").textContent.split("x ")[1]);e.quantity+=n,t.remove()}function k(t){const e=t.target,n=e.dataset.productId,o=c.getFindProduct(n),i=document.getElementById(n);e.classList.contains("quantity-change")&&$(e,i,o),e.classList.contains("remove-item")&&S(i,o),x()}const q=s("div",{id:"stock-status",className:"text-sm text-gray-500 mt-2"}),N=()=>{const t=c.getProducts();let e="";const n=5;t.forEach(o=>{if(o.quantity<n){const a=o.quantity===0;e=`${o.name}: ${a?"품절":"재고 부족 ("+o.quantity+"개 남음)"}`}}),q.textContent=e},A=(t,e)=>{t=Math.floor(e/1e3);let n=document.getElementById("loyalty-points");n||(n=s("span",{id:"loyalty-points",className:"text-blue-500 ml-2"}),y.appendChild(n)),n.textContent=`(포인트: ${t})`},r=s("select",{id:"product-select",className:"border rounded p-2 mr-2"}),f=()=>{r.innerHTML="",c.getProducts().forEach(e=>{const n=s("option",{value:e.id,textContent:`${e.name} - ${e.price}원`});e.quantity===0&&(n.disabled=!0),r.appendChild(n)})};function F(){setTimeout(()=>{setInterval(()=>{const o=c.getProducts(),i=o[Math.floor(l*o.length)];if(l<.3&&i.quantity>0){const u=Math.round(i.price*.8);i.price=u,alert(`번개세일! ${i.name}이(가) 20% 할인 중입니다!`),f()}},T)},l*P)}function M(){setTimeout(()=>{setInterval(()=>{const n=c.getProducts(),o=C.selectedProduct;if(o){const i=n.find(a=>a.id!==o&&a.quantity>0);if(i){alert(`${i.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);const a=Math.round(i.price*.95);i.price=a,f()}}},E)},l*R)}function B(){F(),M()}function L(){g.addEventListener("click",D),p.addEventListener("click",k)}function O(t){const e=c.getProducts();let n=p.children;for(let o=0;o<n.length;o++){let i;for(let d=0;d<e.length;d++)if(e[d].id===n[o].id){i=e[d];break}let a=parseInt(n[o].querySelector("span").textContent.split("x ")[1]),u=i.price*a;const v=a>=10;let I=j(v,i);t.cartItemQuantity+=a,t.subTot+=u,t.cartTotalAmount+=u*(1-I)}}function j(t,e){return t?e.id==="p1"?.1:e.id==="p2"?.15:e.id==="p3"?.2:e.id==="p4"?.05:e.id==="p5"?.25:0:0}function H(t){if(t.cartItemQuantity>=30){const o=t.cartTotalAmount*.25,i=t.subTot-t.cartTotalAmount;o>i?(t.cartTotalAmount=t.subTot*(1-.25),t.discountRate=.25):t.discountRate=(t.subTot-t.cartTotalAmount)/t.subTot}else t.discountRate=(t.subTot-t.cartTotalAmount)/t.subTot}function U(t){const e=new Date().getDay()===2,n=.1;e&&(t.cartTotalAmount*=1-n,t.discountRate=Math.max(t.discountRate,n))}function W(t){y.textContent=`총액: ${Math.round(t.cartTotalAmount)}원`}function z(t){const e=(t*100).toFixed(1),n=s("span",{className:"text-green-500 ml-2",textContent:`(${e}% 할인 적용)`});y.appendChild(n)}function x(){const t={discountRate:0,cartItemQuantity:0,cartTotalAmount:0,subTot:0};let e=0;O(t),H(t),U(t),W(t),t.discountRate>0&&z(t.discountRate),N(),A(e,t.cartTotalAmount)}function G(){const t=document.getElementById("app"),e=[Q,p,y,r,g,q];b.append(...e),f(),h.appendChild(b),t.appendChild(h)}function J(){G(),L(),B()}function K(){J(),x()}K();
