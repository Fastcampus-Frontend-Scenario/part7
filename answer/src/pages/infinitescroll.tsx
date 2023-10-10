import { fetchProducts } from "@/api/products"
import { ProductComponent, ProductSkeletonComponent } from "@/componenets/Product"
import styled from "@emotion/styled"
import { CircularProgress, Skeleton } from "@mui/material"
import { QueryClient, dehydrate, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts(0)
    })
    // HACK
    queryClient.setQueryData(
        ['products'],
        {
            pages: (queryClient.getQueryData(['products'])as any).pages,
            pageParams: [0],
        },
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const InfinniteScrollComponent: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null)

    const { data, isFetching, fetchNextPage, hasNextPage, isLoading} = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            // arrived at end
            if (lastPage.pageCount === allPages.length) return undefined
            return allPages.length
        },
    })
    
    const callback = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isFetching) fetchNextPage()
            })
        },
        [fetchNextPage, isFetching]
    )

    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(callback)
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref, callback])

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
                {data?.pages.map(page => 
                    page.products.map(product => <ProductComponent key={product.id} {...product}/>)
                )}
            </ProductListContainer>
            {isFetching && <CircularProgress style={{ margin: 16}}/>}
            {hasNextPage && <div id='observer' ref={ref} style={{ height: 30, width: '100%' }} />}
        </Container>
    )
}

const InfinniteScrollSkeleton: React.FC = () => {
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
    flexDirection: 'column',
})
export default InfinniteScrollComponent