import React from "react";
import { TodoStore } from "./TodoStore";

const RootStateContext = React.createContext({});
const todoStore = new TodoStore();

export const RootStateProvider = ({ children }) => {
  return (
    <RootStateContext.Provider value={{ todoStore }}>
      {children}
    </RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
