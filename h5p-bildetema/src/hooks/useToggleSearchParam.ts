import { useSearchParams } from "react-router-dom";
import { SearchParameters } from "../enums/SearchParameters";

// Will return a function to toggle the searchParam on and off.
export const useToggleSearchParam = (
  search: SearchParameters,
  defaultValue: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
): ((value: boolean) => void) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (value: boolean) => {
    if (defaultValue === value) {
      searchParams.delete(search);
      setSearchParams(searchParams);
      setState(value);
      return;
    }

    searchParams.set(search, value.toString());
    setSearchParams(searchParams);
    setState(value);
  };
};
