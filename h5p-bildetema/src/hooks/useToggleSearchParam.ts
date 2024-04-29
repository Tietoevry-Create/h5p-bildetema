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
    } else {
      searchParams.set(search, String(value));
    }

    setSearchParams(searchParams);
    setState(value);
  };
};
