export type ProductRating = {
    rate: number
    count: number
}
export type Product = {
    id: number
    title: string
    price: number
    image: string
    description: string
    rating: ProductRating

}