import Provider from './Provider';
import Slab from './Slab';

export default interface CommissionItem {
    commissionItemId?: number;
    commissionId?: number;
    providerId?: number;
    provider?: Provider;
    commission?: number;
    isPercent?: boolean;
    slabId?: number;
    slab?: Slab;
}
