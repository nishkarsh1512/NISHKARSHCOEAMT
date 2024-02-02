import { create } from "zustand"

interface ModalState {
  delAccModalActive: boolean
  setDelAccModalActive: (delAccModalActive: boolean) => void
  reset: () => void
}

export const useModalStore = create<ModalState>()((set) => ({
  delAccModalActive: false,
  setDelAccModalActive: (delAccModalActive: boolean) =>
    set(() => ({ delAccModalActive })),

  reset: () =>
    set(() => ({
      delAccModalActive: false,
    })),
}))
