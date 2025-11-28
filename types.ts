export type Role = 'student' | 'teacher' | 'guest' | 'admin';

export interface User {
  email?: string;
  name?: string;
  role: Role;
  sdms?: string;
}

export interface Lesson {
  id: number;
  title: string;
  class: string;
  description: string;
}

export interface Assessment {
  id: number;
  name: string;
  class: string;
  assignedToSDMS: string[];
  type: 'quiz' | 'assignment' | 'exam';
  dueDate: string;
  instructions: string;
}

export interface StudentGrades {
  [assessmentId: number]: {
    [studentSDMS: string]: number;
  };
}

export type ViewState = 
  | 'home' 
  | 'about' 
  | 'communication' 
  | 'news' 
  | 'forum' 
  | 'teacher-dashboard' 
  | 'student-dashboard' 
  | 'apply' 
  | 'contact';
