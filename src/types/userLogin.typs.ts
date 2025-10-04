export type userLoginState ={
    token: null | string,
    user:  null |User 
}



export interface User {
  _id: string | undefined;            // معرف المستخدم، نصي
  name: string;           // اسم المستخدم
  email: string;          // البريد الإلكتروني
  dateOfBirth: string;    // تاريخ الميلاد (بنص بصيغة dd-mm-yyyy)
  gender: "male" | "female"; // النوع، قيم محدودة
  photo: string;          // رابط صورة البروفايل
  createdAt: string;      // تاريخ الإنشاء (صيغة ISO Date)
}