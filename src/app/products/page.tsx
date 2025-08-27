import { getServerSession } from "next-auth"

import CheckoutButton from "@/components/CheckoutButton"
import { backendless } from "@/lib/api/axios"
import { getAuth } from '@/lib/cookie/auth'

import { authOptions } from "../api/auth/[...nextauth]/route"

interface IProduct {
    objectId: string,
    image: string,
    name: string,
    price: number,
    stock: number
}

export default async function Products() {

    const res = await backendless.get('/data/products')
    const data = await getAuth()
    const product: IProduct[] = res.data

    const session = await getServerSession(authOptions)

    console.log('session expires : ', session?.expires)
    console.log('session user : ', session?.user)

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">All Products</h1>
            <div className="grid grid-cols-2 gap-4">
                {
                    product.length > 0 ?
                        product.map((item, key) => {
                            return (
                                <div key={key} className="border p-4 rounded-shadow">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full object-cover h-32"
                                    />
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p>Rp {item.price.toLocaleString()}</p>
                                    <p>Stock : {item.stock}</p>
                                    <CheckoutButton
                                        productId={item.objectId}
                                        token={data.token as string}
                                    />
                                </div>
                            )
                        }) :
                        <div className="flex w-full h-full justify-center items-center text-red-800 font-semibold">
                            <h2>No data product available now</h2>
                        </div>
                }
            </div>
        </div>
    )
}
