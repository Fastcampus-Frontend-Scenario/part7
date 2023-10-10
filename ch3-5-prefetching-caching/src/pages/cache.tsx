import { ProductListContainer } from "@/components/ProductListContainer"
import { fetchProducts, fetchProductsLimit } from "@/hooks/useFetchProduct"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

const Products: React.FC = () => {
    const [checked, setChekced] = useState(false)
    const { data, isSuccess } = useQuery(
        checked ? ['products', 'limit'] : ['products'],
        checked ? () => fetchProductsLimit(5) : fetchProducts,
        {
            staleTime: 1000000,
        }
    )

    return (
        <div>
            <label>
                <input 
                    type='checkbox'
                    checked={checked}
                    onChange={({target: {checked}}) => setChekced(checked)}
                />
                Limit 5
            </label>
            {isSuccess && (
                <ProductListContainer data={data} />
            )}
        </div>
    )
}

export default Products