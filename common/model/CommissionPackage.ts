import CommissionItem from './CommissionItem';

export default interface CommissionPackage {
    commissionId?: number;
    commissionName?: string;
    items?: CommissionItem[];
    createdBy?: number;
}
