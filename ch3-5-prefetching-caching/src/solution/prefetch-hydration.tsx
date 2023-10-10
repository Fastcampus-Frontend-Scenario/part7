import { ProductListContainer } from "@/components/ProductListContainer"
import { fetchProducts } from "@/hooks/useFetchProduct"
import { Product } from "@/types/types"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import Link from "next/link"

type Props = {
    products: Array<Product>
}

export async function getStaticProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(
        {
            queryKey: ['products'],
            queryFn: fetchProducts,
        }
    )
    
    return { props: { 
        dehydratedState: dehydrate(queryClient)
     }
    }
}

const Products: React.FC<Props> = ({products}) => {
    const { data, isSuccess } = useQuery(
        ['products'], fetchProducts,
    )
    return (
        <div>
            <Link href={'/caching'}>To Prefetching page</Link>
            {isSuccess && (
                <ProductListContainer data={data} />
            )}
        </div>
    )
}

export default Products