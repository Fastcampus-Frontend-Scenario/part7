import { fetchProducts } from "@/api/products"
import { ProductComponent, ProductSkeletonComponent } from "@/componenets/Product"
import styled from "@emotion/styled"
import { Skeleton } from "@mui/material"
import Pagination from "@mui/material/Pagination"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export async function getServerSideProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['products', '0'], () => fetchProducts(0))
    
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const PaginationComponent: React.FC = () => {
    const [pageOffset, setPageOffset] = useState(1)
    const { data, isSuccess, isLoading, isFetching } = useQuery({
        queryKey: ['products', pageOffset],
        queryFn: () => fetchProducts(pageOffset-1),
        staleTime: 1000 * 60 * 60 * 24 // 24hr
    })
    const [pageCount, setPageCount] = useState<number | null>(null)

    useEffect(() => {
        if (data?.pageCount)
            setPageCount(data.pageCount)
    }, [data?.pageCount])
    return (
        <Container>
            <ProductListContainer>
                {isLoading && (
                    <>
                        <ProductSkeletonComponent />
                        <ProductSkeletonComponent />
                        <ProductSkeletonComponent />
                        <ProductSkeletonComponent />
                        <ProductSkeletonComponent />
                    </>
                )}
                {data?.products.map(product => <ProductComponent key={product.id} {...product}/>)}
            </ProductListContainer>
            {pageCount === null && <PaginationSkeleton />}
            {pageCount !== null && <Pagination count={pageCount} color="primary" defaultPage={1} page={pageOffset} onChange={(_, page) => setPageOffset(page)}/>}
        </Container>
    )
}

const PaginationSkeleton: React.FC = () => {
    return (
        <ProductListContainer>
            <Skeleton variant='circular' width={32} height={32} style={{ marginRight: 4}}/>
            <Skeleton variant='circular' width={32} height={32} style={{ marginRight: 4}}/>
            <Skeleton variant='circular' width={32} height={32} style={{ marginRight: 4}}/>
            <Skeleton variant='circular' width={32} height={32} />
        </ProductListContainer>
    )
}
const Container = styled.div({
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
})

const ProductListContainer = styled.div({
    display: "flex",
    flexDirection: 'row',
})
export default PaginationComponent