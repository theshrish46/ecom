import { create } from 'zustand'


interface ModalStoreType {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useStoreModal = create<ModalStoreType>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))