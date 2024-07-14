import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    color: string;
    icon: ReactNode;
    children: string;
    onClick?: () => void;
}

export function Button({icon, children, color, onClick}: ButtonProps){
    return(
        <button 
            className="h-11 w-full px-4 rounded-md font-bold shadow flex items-center 
            justify-center gap-2 hover:opacity-70 transition-all"
            style={{backgroundColor: color}}
            onClick={onClick}
            >
        {icon}
        {children}
        </button>
    )
}