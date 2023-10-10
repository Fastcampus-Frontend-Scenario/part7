import { ProductListContainer } from "@/components/ProductListContainer"
import { fetchProducts } from "@/hooks/useFetchProduct"
import { Product } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

type Props = {
    products: Array<Product>
}
export async function getStaticProps() {
    const products = await fetchProducts()
    return {
        props: { products }
    }
}

const PrefetchInitialData: React.FC<Props> = ({ products }) => {
    const {data, isSuccess} = useQuery(
        ['products'],
        fetchProducts,
        {
            initialData: products
        }
    )

    return (
        <div>
            {isSuccess && (
                <ProductListContainer data={data} />
            )}
        </div>
    )
}

export default PrefetchInitialData