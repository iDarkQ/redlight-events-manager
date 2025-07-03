import { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextProps {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  searchBar: string;
  setSearchBar: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export interface Filter {
  type: string;
  dateFrom: string;
  dateTo: string;
  geomtry: number[][][];
}

export const defaultFilter: Filter = {
  type: "",
  dateFrom: "",
  dateTo: "",
  geomtry: [],
};

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [searchBar, setSearchBar] = useState<string>("");

  return (
    <FilterContext.Provider value={{ filter, setFilter, searchBar, setSearchBar }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw Error("useFilter has to be used within FilterProvider");
  }

  return context;
};
