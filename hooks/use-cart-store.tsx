import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
import { Product } from '@/types';
import { toast } from 'sonner';



interface CartStore {
    items: Product[],
    addItem: (data: Product) => void,
    removeItem: (id: string) => void,
    removeAll: () => void,
}

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currectItems = get().items
            const existingItem = currectItems.find((item) => item.id === data.id)

            if (existingItem) {
                return toast.warning("Item already exists in cart")
            }

            set({ items: [...get().items, data] })
            toast.success("Added to cart")
        },

        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] })
            toast.warning("Item removed")
        },

        removeAll: () => {
            set({ items: [] })
        }
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export default useCart;