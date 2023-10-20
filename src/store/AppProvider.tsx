"use client";
import { Provider } from "react-redux";
import { setupStore } from "@/store/store";

interface AppProviderProps {
  children: React.ReactNode;
  locale: string;
}

const AppProvider = ({ children, locale }: AppProviderProps) => {
  return (
    <Provider store={setupStore({ locale: { locale } })}>{children}</Provider>
  );
};

export default AppProvider;
