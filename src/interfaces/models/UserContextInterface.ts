import {UserModel} from "./UserModel";
import React from "react";

export interface UserContextInterface {
  currentUser? : UserModel;
  fetchUser: <UserModel>() => Promise<void>;

  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>

  onLogOut: () => Promise<void>
  onClearUser: () => void;

  roles: string[];
}