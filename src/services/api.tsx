import axios from "axios"

export const api = axios.create({
    baseURL: 'https://json-pet-house.vercel.app/products'
})