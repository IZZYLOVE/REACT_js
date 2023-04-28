import PasswordResetModal from "./PasswordResetModal"
import RegisterModal from "./RegiterModal"
import Cart from "./components/pages/cart/Cart"
import ProductDetails from "./components/pages/cart/ProductDetails"
import LoginModal from "./loginModal"
import CheckoutModal from "./CheckoutModal"
import OrdersModal from "./OrdersModal"

const Modals = () => {

  return (
    <>
    <LoginModal />
    <PasswordResetModal />
    <RegisterModal />
    <ProductDetails />
    <Cart />
    <CheckoutModal/>
    <OrdersModal/>
    </>
  )
}

export default Modals