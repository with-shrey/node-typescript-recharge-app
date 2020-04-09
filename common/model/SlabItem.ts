export default interface SlabItem {
    slabItemId?: number;
    slabId?: number;
    min?: number;
    max?: number;
    commission?: number;
    commissionIsPercent?: boolean;
    surcharge?: number;
    surchargeIsPercent?: boolean;
    tds?: number;
    gst?: number;
}
