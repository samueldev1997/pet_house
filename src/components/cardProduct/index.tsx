import { BsCartPlusFill } from "react-icons/bs";


interface CardProps{
    id?: number;
    title: string;
    description?: string;
    price: number;
    cover: string;
    handleAddItem: () => void;
}

export function CardProduct({title, price, cover, handleAddItem }: CardProps){
    return(
            <section className="flex flex-col shadow-lg border border-dashed border-gray-400 rounded" >
                <div className="mx-auto" >
                    <img  
                        src={cover}
                        className="w-60 p-3 hover:scale-105 duration-700"
                    />
                </div>
                <div className="px-5 flex flex-col items-center " >
                    <div className="h-16 flex items-center justify-center" >
                        <p className="text-sm mb-2" > {title} </p>
                    </div>
                    <strong className="text-sm" > {price.toLocaleString('pt-Br', {
                        style: 'currency',
                        currency: 'BRL'
                    })} </strong>
                    <button onClick={() => handleAddItem()} className="flex bg-slate-100 my-2 p-1 rounded text-sm font-medium shadow-md" >
                        <BsCartPlusFill size={20} />
                    </button>
                </div>
            </section>
    )
}