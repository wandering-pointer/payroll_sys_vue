export interface OvertimeRecord {
    id: number,
    empId: string,
    start: Date,
    end: Date,
    policyId: number,
    notes: string,
    status: string,
}