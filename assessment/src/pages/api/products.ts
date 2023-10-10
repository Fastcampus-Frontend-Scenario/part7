// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from '@/types/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import productsData from '../../data/products.json'

type Data = {
    products: Array<Product>
    pageCount: number
}

const productJson = productsData as Array<Product>
const chunk = productJson.reduce((resultArray: Array<Array<Product>>, item, index: number) => {
    const chunkIndex = Math.floor(index / 5)

    if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
}, [])

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // give delay for 1000ms
    // FIXME: for development prupose, reduce it as 0
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const pageCount = chunk.length
    if (req.query.page !== undefined) {
        // page query exists
        const pageNum = Number(req.query.page)
        if (pageNum < 0) return res.status(200).json({ products: [], pageCount })
        if (pageNum > chunk.length - 1) return res.status(200).json({ products: [], pageCount })
        return res.status(200).json({ products: chunk[pageNum], pageCount })
    }
    // else, return all products
    const products: Array<Product> = new Array()
    res.status(200).json({ products, pageCount })
}
