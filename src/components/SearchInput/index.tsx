import React, { ChangeEvent, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks";
import './SearchInput.css'

type Props = {
  onTypingEnd: (searchString: string) => void;
  value?: string;
};
export const SearchInput: React.FC<Props> = React.memo(
  ({ onTypingEnd, value = "" }) => {
    const [inputString, setInputString] = React.useState(value);
    const [debouncedValue, setDebouncedValue] = React.useState("");

    useDebounce(
      () => {
        setDebouncedValue(inputString);
      },
      2000,
      [inputString]
    );

    useEffect(() => {
      if (value !== inputString) {
        setInputString(value);
      }
    }, [value]);

    const inputHandle = useCallback(
      ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        setInputString(currentTarget.value);
      },
      []
    );

    useEffect(() => {
      if (debouncedValue && debouncedValue.length > 0) {
        onTypingEnd(debouncedValue);
      }
    }, [debouncedValue]);

    useEffect(() => {
      if (!inputString.length) {
        onTypingEnd(inputString);
      }
    }, [inputString]);

    return (
      <label>
        Repositories
        <input
          type="text"
          value={inputString}
          placeholder="Type repo name..."
          onChange={inputHandle}
        />
      </label>
    );
  }
);
