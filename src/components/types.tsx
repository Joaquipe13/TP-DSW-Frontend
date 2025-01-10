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
  createAt?: Date;
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

export interface CoursePurchaseRecord {
  id?: number;
  totalAmount: number;
  purchaseAt?: Date;
  user: number | User;
  course: number | Course;
}
export interface SubsPurchaseRecord {
  id?: number;
  totalAmount: number;
  purchaseAt?: Date;
  subscription: number | Subscription;
  user: number;
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
