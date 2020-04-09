import SlabItem from './SlabItem';

export default interface Slab {
    slabId?: number;
    slabName?: string;
    slabItems?: SlabItem[];
    createdBy?: number;
}
