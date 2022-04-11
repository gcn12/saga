export interface Account {
  id: string;
  name: string;
  username: string;
}

export interface Settings {
  accentColor: string;
  backgroundColor: string;
}

interface Profile {
  profilePictureURL: string;
  career: string;
  location: string;
  bio: string;
  tabs: Tab[];
  videoIntroduction?: string;
}

export type User = Profile & Settings & Account;

export interface Tab {
  type: string;
  name: string;
  key: number;
}

export type ProjectElements =
  | "smallPhoto"
  | "paragraph"
  | "header"
  | "largePhoto"
  | "leftPhoto"
  | "rightPhoto";

export interface Project {
  type: ProjectElements;
  content: any;
  key: number;
}

export interface ProjectPreview {
  title: string;
  id: string;
  imageURL: string;
  description: string;
  projectLink: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  isCurrentExperience: boolean;
  startDate: Date;
  endDate: Date;
}

type ContactTypes = "instagram" | "email" | "twitter" | "facebook";

export interface Contacts {
  type: ContactTypes;
  value: string;
}

interface Blog {
  title: string;
  content: string;
  id: string;
}

export interface BlogPreview {
  title: string;
  id: string;
  date: string;
}

export type BlogElements = "smallPhoto" | "paragraph" | "header" | "largePhoto";

export interface BlogElement {
  type: BlogElements;
  content: string;
  key: number;
}
