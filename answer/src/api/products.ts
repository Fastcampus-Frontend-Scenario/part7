import { ProductResponse } from "@/pages/api/products"

export const fetchProducts = async (page: number): Promise<ProductResponse> => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?page=${page}`)
    const productJson = await products.json() as ProductResponse
    return productJson
}