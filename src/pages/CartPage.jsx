import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { getProductById } from '../data/products';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-600 mb-6" />
        <h2 className="font-serif text-3xl text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-400 mb-8">Indulge in our exquisite collection of fragrances.</p>
        <Link to="/" className="btn-gold px-8 py-3 rounded-lg text-sm uppercase tracking-widest">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cartItems.map((item) => {
            const product = getProductById(item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="flex gap-6 bg-luxury-card border border-white/5 p-4 rounded-2xl relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-luxury-accent/50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-luxury-gold tracking-widest uppercase">{product.type}</p>
                      <h3 className="font-serif text-lg sm:text-xl text-white">{product.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">${product.price}.00</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-rose-500 transition-colors p-1">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center bg-luxury-dark border border-white/10 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-400 hover:text-white">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm w-6 text-center text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-400 hover:text-white">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-serif text-lg text-white font-semibold">
                      ${(product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-right">
            <button onClick={clearCart} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest underline underline-offset-4">
              Clear Cart
            </button>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-luxury-card border border-white/5 rounded-2xl p-6 sm:p-8 sticky top-28">
            <h3 className="font-serif text-2xl text-white mb-6">Order Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between items-center text-lg font-serif">
                <span className="text-white">Total</span>
                <span className="text-luxury-gold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="btn-gold w-full mt-8 flex justify-center items-center gap-2 py-3.5 rounded-lg text-sm uppercase tracking-widest">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[10px] text-gray-500 text-center mt-4 uppercase tracking-widest">
              Secure 256-bit SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
