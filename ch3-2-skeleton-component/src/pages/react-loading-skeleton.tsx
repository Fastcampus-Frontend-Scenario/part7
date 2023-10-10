/* eslint-disable @next/next/no-img-element */
import { Post } from "@/components/react-loading-skeleton/ReactLoadingSkeletonLine"
import { TableTheming } from "@/components/react-loading-skeleton/ReactLoadingSkeletonTable"
import { useState } from "react"

const Example: React.FC = () => {
    const [loading, setLoading] = useState(true)

    return (
        <div>
            <h3>React loading skeleton</h3>
            <input
                className="form-check-input"
                type="checkbox"
                id={`loadingCheckbox`}
                checked={loading}
                onChange={() => setLoading((b) => !b)}
            />
            <label className="form-check-label" htmlFor={`loadingCheckbox`}>
                Loading
            </label>
            <br />
            <br />
            <Post loading={loading} />
            <TableTheming loading={loading} />
        </div>
    )
}

export default Example