export interface MonthlySalary {
    id: number,
    empId: string,
    yearMonth: string,
    baseSalary: number,
    allowanceTotal: number,
    attendanceDeduction: number,
    tax: number,
    otherSources: number,
    salary: number,
    notes: string,
    checked: boolean,
}
