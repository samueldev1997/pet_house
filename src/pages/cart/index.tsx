import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import { useNavigate } from "react-router-dom"
import { BsCartPlusFill } from "react-icons/bs";




export function Cart(){
    const {cart, addNewItem, removeItem, totalCart} = useContext(CartContext)
    const navigate = useNavigate()

    function handleCheckout() {
        navigate('/checkout')
    }
    
    return(
        <div>
            <h1 className="text-center font-bold text-2xl mb-8 mt-7"> Meu carrinho </h1>
            {cart.length === 0 && (
                <div>
                    <h1 className="text-center" > Seu carrinho está vazio... </h1>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mx-auto p-5 w-full
                max-w-7xl mb-8 border-b" >
                {cart.map((item) => (
                <section 
                    key={item.id}
                    className="shadow-lg border border-dashed border-gray-400 flex flex-col items-center justify-center rounded" >
                    <img 
                        src={item.cover}
                        className="w-52 p-2"
                    />
                    <div className="w-full flex flex-col items-center p-3" >
                        <div className="h-16 ">
                            <strong className="mb-5 line-clamp-2 " > {item.title} </strong>
                        </div>
                        <p className="mt-1 mb-4" > {item.price.toLocaleString('pt-Br', {
                            style: 'currency',
                            currency: 'BRL'
                        })} </p>
                        <div className="flex items-center gap-5">
                            <div className="flex gap-2 items-center" >
                                <button 
                                    onClick={() => removeItem(item)}
                                    className="text-xs bg-slate-400 w-5 h-5 p-2 rounded flex items-center
                                    justify-center font-bold" > - 
                                </button>
                                <span className="text-sm" > {item.amount} </span>
                                <button 
                                    onClick={() => addNewItem(item)}
                                    className="text-xs bg-slate-400 w-5 h-5 p-2 rounded flex items-center 
                                    justify-center font-bold"> + 
                                </button>
                            </div>
                            <strong className="text-xs" > SubTotal: {item.total.toLocaleString('pt-Br', {
                                style: 'currency',
                                currency: 'BRL'
                            })} </strong>
                        </div>
                    </div>
                </section>
                ))}
            </div>
            {cart.length !== 0 && (
                <div className='w-full max-w-7xl mx-auto px-5 mb-10 bg-slate-100 h-20 flex items-center 
                    justify-between'>
                    <strong className="text-sm md:text-lg bg-green-400 px-5 py-2 shadow-md"> Total: {totalCart} </strong>
                    <button 
                        onClick={() => handleCheckout()}
                        className="flex items-center justify-center gap-3 text-sm md:text-lg bg-slate-600 px-5 py-2 shadow-md
                        text-white font-bold" > 
                        <BsCartPlusFill size={14} />
                        Ir para checkout
                    </button>
                </div>
            )}
        </div>
    )
} 