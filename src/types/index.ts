export interface Activity {
  name: string;
  hours: number;
}

export interface FormData {
  clientName: string;
  clientEmail: string;
  street: string;
  postCode: string;
  town: string;
  invoiceNumber: string;
  invoiceDate: string;
  activities: Activity[];
  lunchMoney?: number;
  totalCost: number;
  totalHours: number;
}

export interface FormErrors {
  [key: string]: string;
}