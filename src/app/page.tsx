// "use client";
import Image from "next/image";
import Link from "next/link";

async function getData() {
    const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST+'/api/customers', {cache: 'no-store'})
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Home() {
    const dynamicData = await getData();

    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">LName</th>
                    <th scope="col" className="px-6 py-3">FName</th>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Email</th>
                    <th scope="col" className="px-6 py-3">PostalCode</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {dynamicData.map(customer => (
                    <tr>
                        <td>{customer.id}</td>
                        <td>{customer.lastname}</td>
                        <td>{customer.firstname}</td>
                        <td>{customer.title}</td>
                        <td>{customer.email}</td>
                        <td>{customer.postal_code}</td>
                        <td><Link href={`/customer/${customer.id}`}
                                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Show Order</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
