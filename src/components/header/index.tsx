import logo from '../../assets/logo-pet.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';


import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
    const { cartAmount, cart } = useContext(CartContext);

    const {signed, logout} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login'); 
        } catch (error) {
            console.log('Erro ao fazer logout: ', error);
        }
    };

    return (
        <div className='w-full bg-yellow-200'>
            <header className='w-full max-w-7xl mx-auto flex justify-between items-center px-5 h-16'>
                <Link to='/'>
                    <img src={logo} className='w-14' />
                </Link>
                <div className='flex gap-3 md:gap-10'>
                    <nav className='font-semibold'>
                        <ul className='flex gap-7'>
                            {!signed ? (
                                <>
                                    <li className='text-sm md:text-base'>
                                        <Link to='/login'>Login</Link>
                                    </li>
                                    <li className='text-sm md:text-base' >
                                        <Link to='/register'>Criar conta</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <button onClick={handleLogout}>Sair</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                    <Link to='/cart' className='relative'>
                        <FaShoppingCart size={23} />
                        {cart.length > 0 && (
                            <span className='text-xs absolute left-4 top-3 w-1 h-2 p-2 flex items-center 
                                justify-center text-white bg-lime-500 rounded-full'>
                                {cartAmount}
                            </span>
                        )}
                    </Link>
                </div>
            </header>
        </div>
    );
}
