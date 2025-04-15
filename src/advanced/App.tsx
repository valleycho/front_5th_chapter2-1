import Cart from './components/Cart';
import { ProductsProvider } from './provider/ProductProvider';

function App() {
  return (
    <ProductsProvider>
      <Cart />
    </ProductsProvider>
  );
}

export default App;
