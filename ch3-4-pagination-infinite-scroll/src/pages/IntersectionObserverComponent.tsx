import { Contents } from "@/components/common/Contents"
import { RepositoryInfos } from "@/types/types"
import { fetchGitHubRepos } from "@/utils/fetcher"
import { useCallback, useEffect, useRef, useState } from "react"

const IntersectionObserverComponent: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [pageOffset, setPageOffset] = useState(0)
    const [data, setData] = useState<RepositoryInfos>([])
    const [isLoading, setLoading] = useState(false)
    
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

    const callback = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isLoading) {
                    fetchData()
                }
            })
        }, [fetchData, isLoading])

    useEffect(()=> {
        if (!ref.current) return
        const observer = new IntersectionObserver(callback)
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [callback])

    return (
        <div>
            <Contents data={data}/>
            <div id='observer' ref={ref} style={{ height: 30, width: '100%', background: '#cc0000cc'}} />
        </div>
    )
}

export default IntersectionObserverComponent