export interface Topic {
  id?: number;
  description: string;
  courses?: number[] | Course[];
}
export interface Level {
  id?: number;
  order?: number;
  name?: string;
  description?: string;
  course?: number | Course;
  units?: Unit[];
}
export interface File {
  id?: number;
  nameFile: string;
  typeFile?: string;
  unit?: number | Unit;
}
export interface Unit {
  id?: number;
  order?: number;
  name?: string;
  level?: number | Level;
  content: string;
  files?: number[];
}
export interface Course {
  id?: number;
  isActive?: boolean;
  title: string;
  createdAt: Date;
  price: number;
  resume: string;
  coursePurchaseRecords?: number[] | CoursePurchaseRecord[];
  topics: number[] | Topic[];
  levels?: number[] | Level[];
}
export interface Subscription {
  id?: number;
  isActive?: boolean;
  description: string;
  duration: number;
  price: number;
  subsPurchaseRecords?: number[] | SubsPurchaseRecord[];
}

export interface CoursePurchaseRecord extends PurchaseRecord {
  course: number | Course;
}
export interface SubsPurchaseRecord extends PurchaseRecord {
  subscription: number | Subscription;
  effectiveAt: Date;
}
export interface User {
  id?: number;
  dni?: string;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  admin?: boolean;
  purchaseRecords?: number[] | PurchaseRecord[];
}
interface PurchaseRecord {
  id?: number;
  totalAmount?: number;
  user?: User;
  purchaseAt?: Date;
}
