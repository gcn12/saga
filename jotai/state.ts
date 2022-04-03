import { atom } from "jotai";
import { User } from "../Types/types";
import { createContext } from "react";

const user: User = {
  name: "Gareth",
  username: "gareth",
  accentColor: "blue",
  bio: "Bio",
  backgroundColor: "yellow",
  career: "Writer",
  location: "Venice",
  profilePictureURL: "unsplash.com",
  tabContent: [],
  tabs: [{ type: "blog", name: "Blog", key: 0 }],
  videoIntroduction: "vimeo.com",
  id: "abc",
};

export const userAtom = atom<User>(user);

export const AuthContext = createContext<any>(null);
