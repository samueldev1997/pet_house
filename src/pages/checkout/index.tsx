import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import { Button } from "../../components/button"
import { BsCartPlusFill } from "react-icons/bs"
import { RiDeleteBin2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Checkout(){
    const {cart, totalCart, removeItem, addNewItem, deleteProductCheckout, clearCart} = useContext(CartContext)
    const navigate = useNavigate()

    function handleFinalizePurchase(){
        toast.success('Compra finalizada com sucesso!')
        clearCart()
        navigate('/')
    }

    return(
        <div className="bg-slate-100 min-h-[calc(100vh-4rem)]" >
            <h1 className="text-center font-bold text-xl md:text-2xl py-8"> Checkout </h1>

            <div className="w-full flex flex-col items-center justify-center p-5  gap-5 " >
                {cart.map((item) => (
                    <section 
                        key={item.id}
                        className="w-full  max-w-lg flex shadow-lg bg-yellow-50 border border-dashed border-gray-400 rounded" >
                    <img 
                        src={item.cover}
                        className="w-40 md:w-52 p-2 rounded-xl"
                    />
                    <div className="flex flex-col pt-3" >
                        <div className="px-1">
                            <strong className=" text-sm md:text-base" > {item.title} </strong>
                        </div>
                        <p className="mt-5 mb-4 font-medium text-slate-800" > 
                            {item.price.toLocaleString('pt-Br', {
                                style: 'currency',
                                currency: 'BRL'
                            })} 
                        </p>
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
                        </div>
                        <div className="flex ">
                            <button 
                                onClick={() => deleteProductCheckout(item)}
                                className="mt-6 mb-2 bg-slate-100 p-1 rounded-md" >
                                <RiDeleteBin2Line size={22} />
                            </button>
                        </div>
                    </div>
                    </section>
                ))}
            </div>

            {cart.length > 0 && (
            <>
            <div className="border w-full" ></div>
            <div className="max-w-lg mx-auto pb-10 px-5" >
                <div className="text-xl  my-5" >
                    <strong > Total: {totalCart} </strong>
                </div>
                <Button
                    color="rgb(132 204 22)"
                    icon = {<BsCartPlusFill size={14} />}
                    children="Finalizar compra"
                    onClick={() => handleFinalizePurchase()}
                /> 
            </div>            
            </>    
            )}

        </div>
)}

