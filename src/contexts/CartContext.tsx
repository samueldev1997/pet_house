import { ReactNode, createContext, useState, useEffect } from "react";
import { ProductProps } from '../pages/home'

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addNewItem: (newItem: ProductProps) => void;
    removeItem: (product: CartProps) => void;
    deleteProductCheckout: (product: CartProps) => void;
    clearCart: () => void;
    totalCart: string;
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    const [totalCart, setTotalCart] = useState('')
    const [cart, setCart] = useState<CartProps[]>(
        JSON.parse(localStorage.getItem("cartProducts") || "[]")
    );
    
    useEffect(() => {
        localStorage.setItem("cartProducts", JSON.stringify(cart));
        totalResultCart(cart)
    }, [cart]);

    function addNewItem(newItem: ProductProps){
        const indexItem = cart.findIndex((item) => item.id === newItem.id)
        if(indexItem !== -1){
            let cartList = [...cart];
            cartList[indexItem].amount = cartList[indexItem].amount + 1
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
            setCart(cartList)
            totalResultCart(cartList)
            return;
        }
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }
        setCart(product => [...product, data])
        totalResultCart([...cart, data])
    }

    function totalResultCart(items: CartProps[]){
        let cartList = items
        let resultTotalCart = cartList.reduce((acc, obj) => {return acc + obj.total}, 0)
        const resultFormated = resultTotalCart.toLocaleString('pt-Br', {
            style: 'currency',
            currency: 'BRL'
        })
        setTotalCart(resultFormated)
    }

    function deleteProductCheckout(product: CartProps){
        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function removeItem(product: CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id)
        if(cart[indexItem].amount > 1){
            let cartList = [...cart]
            cartList[indexItem].amount = cartList[indexItem].amount - 1
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price
            setCart(cartList)
            totalResultCart(cartList)
            return;
        }
        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
    }

    function clearCart(){
        setCart([])
    }
    
    return(
        <CartContext.Provider value={{cart, cartAmount: cart.length, addNewItem, removeItem, 
            deleteProductCheckout, totalCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;