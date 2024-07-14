import { Link } from "react-router-dom"
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { IoMdLogIn } from "react-icons/io"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"



export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    
    const {login} = useContext(AuthContext)
    
    async function handleSubmit(e: FormEvent){
        e.preventDefault()
            if(!email || !password){
                toast.error('Preencha todos os campos!');
                return;
            } try {
                await login(email, password);
                navigate('/', { replace: true });
                console.log('USUÁRIO LOGADO COM SUCESSO!');
            } catch (error) {
                setEmail('');
                setPassword('');
                console.log('ERRO AO FAZER O LOGIN:', error);
            }
    }
    
    return(
        <div>
            <div className="px-5 py-14" >
                <section className="w-full max-w-lg flex flex-col items-center justify-center mx-auto
                bg-yellow-50/20 px-10 py-5 rounded shadow-lg border border-dashed border-gray-400">
                <h1 className="font-bold text-xl mb-8 border-b" > Entre com seu e-mail </h1>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-5" >
                        <label>
                            <span className="font-semibold" > E-mail </span>
                            <Input
                                placeholder="Digite seu e-mail"
                                type="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            <span className="font-semibold" > Senha </span>
                            <Input
                                placeholder="Digite sua senha"
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                        <Button
                            color="rgb(132 204 22)"
                            icon={< IoMdLogIn size={22} />}
                            children="Entrar"
                            type="submit"
                        />
                </form>
                <Link to='/register' className="mt-6 text-sm">
                    Não possui uma conta? 
                    <span className="underline" > Cadastre-se! </span>
                </Link>
                </section>
            </div>
        </div>
    )
}