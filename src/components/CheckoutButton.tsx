'use client'
import { useRouter } from "next/navigation"

interface ICheckoutButtonProps {
    productId: string,
    token: string
}

export default function CheckoutButton({ productId, token }: ICheckoutButtonProps) {

    const router = useRouter()

    function isLoggedIn(productId: string, token: string) {
        if (token !== undefined) {
            router.push(`/checkout/${productId}`)
        } else {
            alert('You are not logged in, please log in before continue this action')
            router.push('/auth/login')
        }
    }

    return (
        <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => isLoggedIn(productId, token)}
        >
            Checkout
        </button>
    )
}
