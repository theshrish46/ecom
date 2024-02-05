import { Product } from "@prisma/client"
import { create } from "zustand"

interface CartItem extends Product {
    count: number
}

interface CartStoreType {
    cart: CartItem[]
    count: () => number
    add: (product: Product) => void
    remove: (id: string) => void
    removeAll: () => void
}

export const useCartStore = create<CartStoreType>((set, get) => ({
    cart: [],
    count: () => {
        const { cart } = get()
        if (cart.length) {
            return cart.map((item) => item.count).reduce((prev, cur) => prev + cur)
        }
        return 0
    },

    add: (product: Product) => {
        const { cart } = get()
        const updatedCart = updateCart(product, cart)
        set({ cart: updatedCart })
    },
    remove: (id: string) => {
        const { cart } = get()
        const updatedCart = removeCart(id, cart)
        set({ cart: updatedCart })
    },
    removeAll: () => set({ cart: [] })
}))

function updateCart(product: Product, cart: CartItem[]): CartItem[] {

    const cartItem = { ...product, count: 1 } as CartItem
    const productOnCart = cart.map((item) => item.id).includes(product.id)

    if (!productOnCart) {
        cart.push(cartItem)
    }
    else {
        cart.map((item) => {
            if (item.id === product.id) {
                return { ...item, count: item.count + 1 } as CartItem
            }
            return item
        })
    }
    return cart
}


function removeCart(id: string, cart: CartItem[]): CartItem[] {
    return cart.map((item) => {
        if (item.id === id) {
            return { ...item, count: item.count - 1 }
        }
        return item
    }).filter(item => {
        return item.count
    })
}