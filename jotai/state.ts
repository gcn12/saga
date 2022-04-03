import { kStringMaxLength } from "buffer";
import { atom } from "jotai";
import { User } from "../Types/types";

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
