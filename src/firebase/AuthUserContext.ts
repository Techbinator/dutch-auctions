import * as React from "react";
import { User } from "firebase";
const defaultData: User | null = null;
export const AuthUserContext = React.createContext(defaultData);
