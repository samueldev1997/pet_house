import capa from '../../assets/cats_dogs_trimmed_ppt_compress.png'
import { CardProduct } from "../../components/cardProduct"
import { api } from "../../services/api"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import toast from "react-hot-toast"
import { FaSearch } from "react-icons/fa";

export interface ProductProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home(){
    const [product, SetProduct] = useState<ProductProps[]>([])
    const {addNewItem} = useContext(CartContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getProducts(){
            const response = await api.get('')
            SetProduct(response.data)
            setLoading(false)
        }
        getProducts()
    }, [])

    function handleAddItem(product: ProductProps){
        toast.success('Produto adicionado ao carrinho.')
        addNewItem(product)
    }
    
    return(
        <div>
            <main className="w-full max-w-7xl mx-auto " >
            <div className='max-w-xl mx-auto py-14 px-5  flex items-center justify-center relative' >
                    <input 
                        className='bg-slate-50 px-7 py-2 shadow-lg w-full outline-none'
                        placeholder='Oque seu pet precisa?' 
                    />
                    <FaSearch 
                        size={20}
                        className='absolute right-8 cursor-pointer' />
            </div>
                <img 
                    src={capa}
                    className='w-3/4 md:w-1/3 mx-auto'
                />
                <div className="text-center" >
                    <h1 className="text-xl md:text-2xl font-medium  mt-3 inline-block" >
                        Produtos </h1>
                </div>
                {loading ? (
                    <div className='w-full h-screen flex items-center justify-center'>
                        <h1>Carregando produtos...</h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-7 py-5 px-5">
                        {product.map((product) => (
                            <CardProduct
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                cover={product.cover}
                                handleAddItem={() => handleAddItem(product)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
