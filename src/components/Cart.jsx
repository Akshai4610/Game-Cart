import { useContext } from "react";
import { CartContext } from "../store/shopping-cart";

export default function Cart({ onUpdateItemQuantity }) {
  // const context=useContext(CartContext)
  //const {items}=useContext(CartContext)

  // Older code method implemented
  return (
    <CartContext.Consumer>
      {(cartValue) => {
        const totalPrice = cartValue.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const formattedTotalPrice = `₹${totalPrice.toFixed(2)}`;

        return (
          <div id="cart">
            {cartValue.items.length === 0 && <p>No items in cart!</p>}
            {cartValue.items.length > 0 && (
              <ul id="cart-items">
                {cartValue.items.map((item) => {
                  const formattedPrice = `₹${item.price.toFixed(2)}`;

                  return (
                    <li key={item.id}>
                      <div>
                        <span>{item.name}</span>
                        <span> ({formattedPrice})</span>
                      </div>
                      <div className="cart-item-actions">
                        <button
                          onClick={() => onUpdateItemQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateItemQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <p id="cart-total-price">
              Cart Total: <strong>{formattedTotalPrice}</strong>
            </p>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
}
