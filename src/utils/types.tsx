interface Topic {
  id?: number;
  description: string;
  courses?: number[] | Course[];
}
interface Level {
  id?: number;
  order?: number;
  name?: string;
  description?: string;
  course?: number | Course;
  units?: Unit[];
}
interface File {
  id?: number;
  nameFile: string;
  typeFile?: string;
  unit?: number | Unit;
}
interface Unit {
  id?: number;
  order?: number;
  name?: string;
  level?: number | Level;
  content: string;
  files?: number[];
}
interface Course {
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
interface Subscription {
  id?: number;
  isActive?: boolean;
  description: string;
  duration: number;
  price: number;
  subsPurchaseRecords?: number[] | SubsPurchaseRecord[];
}

interface CoursePurchaseRecord extends PurchaseRecord {
  course: number | Course;
}
interface SubsPurchaseRecord extends PurchaseRecord {
  subscription: number | Subscription;
  effectiveAt: Date;
}
interface User {
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
export type { Topic, Level, File, Unit, Course, Subscription, CoursePurchaseRecord, SubsPurchaseRecord, User, PurchaseRecord };