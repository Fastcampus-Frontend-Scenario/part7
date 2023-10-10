import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

interface Props {
    loading: boolean
}

export const TableTheming: React.FC<Props> = ({ loading }) => {
    return (
        <SkeletonTheme
            baseColor="#5294e0"
            highlightColor="#96c7ff"
            borderRadius="0.5rem"
            duration={4}
        >
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <TableRow key={u.id} user={u} loading={loading} />
                    ))}
                </tbody>
            </table>
        </SkeletonTheme>
    )
}

interface TableRowProps {
    loading: boolean
    user: User
}

function TableRow({ loading, user }: TableRowProps) {
    const status = user.active ? 'Active' : 'Inactive'

    return (
        <tr>
            <td>{loading ? <Skeleton /> : user.id}</td>
            <td>{loading ? <Skeleton /> : user.name}</td>
            <td>{loading ? <Skeleton /> : user.role}</td>
            <td>{loading ? <Skeleton /> : status}</td>
        </tr>
    )
}

export interface User {
    id: number;
    name: string;
    role: string;
    active: boolean;
}

export const users: User[] = [
    { id: 11, name: "Sam", role: "Admin", active: true },
    { id: 19, name: "Kelly", role: "Salesperson", active: true },
    { id: 23, name: "John", role: "Manager", active: false }
];