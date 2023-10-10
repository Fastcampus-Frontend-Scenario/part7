/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/types"

type Props = {
    data: Array<Product>
}
export const ProductListContainer: React.FC<Props> = ({data}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th style={{ maxWidth: 300 }}>ID</th>
                    <th style={{ maxWidth: 300 }}>IMAGE</th>
                    <th style={{ width: 200 }}>TITLE</th>
                    <th style={{ maxWidth: 300 }}>PRICE</th>
                    <th style={{ maxWidth: 300 }}>description</th>
                    <th style={{ maxWidth: 300 }}>rating</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <img src={item.image} alt={item.title} width={200} />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td>{item.rating.rate}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}