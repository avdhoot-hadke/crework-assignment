"use client";
import { createContext, useState, ReactNode } from "react";

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

interface AddTaskContextType {
  addShow: boolean;
  setAddShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddTaskContext = createContext<AddTaskContextType>({
  addShow: false,
  setAddShow: () => {},
});

export function AddTaskProvider({ children }: { children: ReactNode }) {
  const [addShow, setAddShow] = useState<boolean>(false);

  return (
    <AddTaskContext.Provider value={{ addShow, setAddShow }}>
      {children}
    </AddTaskContext.Provider>
  );
}
