import {create} from 'zustand';

interface uploadModelStore {
isOpen: boolean;
onOpen: () => void;
onClose: () => void;
};

const useUploadModal = create<uploadModelStore>((set) => ({
isOpen: false,
onOpen: () => set({isOpen: true}),
onClose: () => set({isOpen: false}),
}));

export default useUploadModal;