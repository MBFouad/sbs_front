// "use client";
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

export default function Page() {
    let total = 0;
    const router = useRouter()
    const [customer, setCustomer] = useState(null)
    var idRegex = new RegExp('^[0-9]+$');
    useEffect(() => {
        if (typeof router.query.id === 'undefined' || !idRegex.test(router.query.id)) return;
        fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/customers/' + router.query.id + '/orders', {cache: 'no-store'})
            .then((res) => res.json())
            .then((customer) => {
                setCustomer(customer)
            })
    }, [router.query.id])
    if (!customer) return <p>No profile data</p>
    return (
        <>
            <Link href="/">Back</Link>
            <h2>Customer Data</h2>
            <p>Name: {customer.title} {customer.firstname} {customer.lastname}</p>
            <h2>Orders</h2>
            <table cellPadding="5" cellSpacing="5">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">Product.no</th>
                    <th scope="col" className="px-6 py-3">Quantity</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Currency</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                </tr>
                </thead>
                <tbody>
                {customer.purchases.map((order, index) => (
                    total += order.price,
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.productId}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                            <td>{order.currency}</td>
                            <td>{order.date.split("T")[0]}</td>

                        </tr>
                ))}
                <tr>
                    <td colSpan="7"><br/></td>
                </tr>
                <tr>
                    <td colSpan="5"><strong>Total</strong></td>
                    <td colSpan="2"><strong>{total}</strong></td>
                </tr>
                </tbody>


            </table>
        </>
    )
}