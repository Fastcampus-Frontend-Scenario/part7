import { ProductListContainer } from "@/components/ProductListContainer"
import { fetchProducts, fetchProductsLimit } from "@/hooks/useFetchProduct"
import { Product } from "@/types/types"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"


const Products: React.FC = () => {

    const [checked, setChecked] = useState(false)
    const { data, isSuccess } = useQuery(
        checked ? ['products', 'limit'] : ['products'], checked ? ()  => fetchProductsLimit(5) : fetchProducts,
        {
            staleTime: 30000,
        }
    )
 

    return (
        <div>
            <Link href={'/prefetch-hydration'}>To Prefetching page</Link>
            <br />
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={({ target: { checked } }) => setChecked(checked)}
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