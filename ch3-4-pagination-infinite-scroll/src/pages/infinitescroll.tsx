import { Contents } from "@/components/common/Contents"
import { RepositoryInfos } from "@/types/types"
import { fetchGitHubRepos } from "@/utils/fetcher"
import { useCallback, useEffect, useState } from "react"

const InfiniteScroll: React.FC = () => {
    const [pageOffset, setPageOffset] = useState(0)
    const [data, setData] = useState<RepositoryInfos>([])
    const [isLoading, setLoading] = useState(false)

    const throttleByRequestAnimationFrame = useCallback((callback: () => void) => {
        return () => {
            return requestAnimationFrame(() => {
                return callback();
            })
        }
    }, [])
    const fetchData = useCallback(async () => {
        setLoading(true)
        fetchGitHubRepos('vercel', 40, pageOffset)
            .then(res => res.json())
            .then(newData => {
                setData([...data, ...newData])
                setPageOffset(pageOffset + 1)
                setLoading(false)
            })
    }, [pageOffset, data])
    const handleScroll = useCallback(()=> {
        console.log('handleScroll --')
        const {innerHeight} = window
        const {scrollTop, offsetHeight} = document.documentElement
        if ( (innerHeight + Math.ceil(scrollTop)) >= offsetHeight && !isLoading) {
            fetchData()
        }
    }, [fetchData, isLoading])

    useEffect(() => {
        const rAFScroll = throttleByRequestAnimationFrame(() => handleScroll())
        window.addEventListener('scroll', rAFScroll)
        return () => window.removeEventListener('scroll', rAFScroll)
    }, [throttleByRequestAnimationFrame, handleScroll])

    useEffect(() => {
        if (!data.length) {
            fetchData()
        }
    }, [fetchData, data])

    return (
        <div>
            <Contents data={data}/>
        </div>
    )
}

export default InfiniteScroll