import { Link } from "react-router-dom"
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { IoMdLogIn } from "react-icons/io";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export function Register(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const {register, } = useContext(AuthContext)

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
            try {
                await register(email, password);
                setTimeout(() => {
                    console.log("Redirecionando para /login...");
                    navigate("/");
                }, 500); 
            } catch (error) {
                console.error("Erro ao registrar usuário:", error);
            }
    }

    return(
        <div>
            <div className="px-5 py-14 " >
                <section className="w-full max-w-lg flex flex-col items-center justify-center mx-auto
                bg-yellow-50/20 px-10 py-5 rounded shadow-lg border border-dashed border-gray-400">
                <h1 className="font-bold text-xl mb-8 border-b" > Entre com seu e-mail </h1>
                <form onSubmit={handleRegister} className="w-full flex flex-col gap-5" >
                        <label>
                            <span className="font-semibold" > Nome </span>
                            <Input
                                placeholder="Digite seu nome"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </label>
                        <label>
                            <span className="font-semibold" > Sobrenome </span>
                            <Input
                                placeholder="Digite seu sobrenome"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </label>
                        <label>
                            <span className="font-semibold" > E-mail </span>
                            <Input
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                            />
                        </label>
                        <label>
                            <span className="font-semibold" > Senha </span>
                            <Input
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </label>
                        <Button
                            color="rgb(250 204 21)"
                            icon={< IoMdLogIn size={22} />}
                            children="Criar conta"
                            type="submit"
                        />
                </form>
                <Link to='/login' className="mt-6 text-sm">
                    Já possui uma conta? 
                    <span className="underline" > Faça login! </span>
                </Link>
                </section>
            </div>
        </div>
    )
}