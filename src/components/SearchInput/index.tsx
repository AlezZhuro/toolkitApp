import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks";
import React from "react";

type Props = {
  onTypingEnd: (searchString: string) => void;
};
export const SearchInput: React.FC<Props> = ({ onTypingEnd }) => {
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
    onTypingEnd(debouncedValue.trim());
    console.log(debouncedValue);
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
