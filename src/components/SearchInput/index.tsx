import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks";
import React from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  onTypingEnd: (searchString: string) => void;
};
export const SearchInput: React.FC<Props> = ({ onTypingEnd }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [val, setVal] = React.useState("");
  const [debouncedValue, setDebouncedValue] = React.useState("");

  useDebounce(
    () => {
      setDebouncedValue(val);
    },
    2000,
    [val]
  );

  const inputHandle = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      setVal(currentTarget.value);
    },
    []
  );

  useEffect(() => {
    const urlSearchParam = searchParams.get("search");
    if (urlSearchParam && urlSearchParam.length > 0) {
      setVal(urlSearchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    onTypingEnd(debouncedValue.trim());
    if (debouncedValue && debouncedValue.length > 0) {
      setSearchParams(`search=${val}`);
    } else {
      setSearchParams("");
    }
  }, [debouncedValue]);

  return (
    <label>
      Repositories
      <input
        type="text"
        value={val}
        placeholder="Type repo name..."
        onChange={inputHandle}
      />
    </label>
  );
};
