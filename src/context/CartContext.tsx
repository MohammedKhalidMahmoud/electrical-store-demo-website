import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem, ToastState } from '../types';

interface CartContextValue {
  cartItems: CartItem[];
  wishlistIds: string[];
  cartCount: number;
  toast: ToastState;
  addToCart: (productId: string, quantity?: number, productName?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  hideToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: 'prod-7', quantity: 2 },
    { productId: 'prod-10', quantity: 1 },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-4', 'prod-16']);
  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });
  const toastTimerRef = useRef<number | null>(null);

  const showToast = (message: string) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    setToast({ message, visible: true });
    toastTimerRef.current = window.setTimeout(() => {
      setToast((current) => ({ ...current, visible: false }));
    }, 2000);
  };

  const addToCart = (productId: string, quantity = 1, productName = 'المنتج') => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === productId);

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentItems, { productId, quantity }];
    });

    showToast(`تمت إضافة ${productName} إلى السلة`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.productId !== productId),
      );
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
    showToast('تم حذف المنتج من السلة');
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const hideToast = () => {
    setToast((current) => ({ ...current, visible: false }));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistIds,
        cartCount,
        toast,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        isInWishlist,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
