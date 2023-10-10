import { ProductListContainer } from "@/components/ProductListContainer"
import { fetchProducts } from "@/hooks/useFetchProduct"
import { Product } from "@/types/types"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"

type Props = {
    products: Array<Product>
}
export async function getStaticProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(
        {
            queryKey: ['products'],
            queryFn: fetchProducts
        }
    )
    return {
        props: { 
            dehydratedState: dehydrate(queryClient)
         }
    }
}

const PrefetchHydrate: React.FC<Props> = ({ products }) => {
    const { data, isSuccess } = useQuery(
        ['products'],
        fetchProducts,
    )

    return (
        <div>
            {isSuccess && (
                <ProductListContainer data={data} />
            )}
        </div>
    )
}

export default PrefetchHydrate