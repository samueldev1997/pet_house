import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps){
    return(
        <input 
            {...props}
            className="h-11 w-full bg-slate-100 px-4 rounded-md outline-none"
        />
    )
}