import { ContentsProps } from "@/types/types"
import { useEffect } from "react"

export const Contents: React.FC<ContentsProps> = ({ data }) => {
    const length = data.length
    useEffect(() =>
        console.log('length', length)
    , [length])
    return (
        <div>
            {data.map((item, index) => <p key={`${item.name}-${index}`}>{item.name}</p>)}
        </div>
    )
}