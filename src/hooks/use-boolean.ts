"use client";

import { useCallback, useMemo, useState } from "react";

export const useBoolean = () => {
  const [value, setValue] = useState(false);

  const onTrue = useCallback(() => {
    setValue(true);
  }, []);
  const onFalse = useCallback(() => {
    setValue(false);
  }, []);
  const onToggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const memorizedValue = useMemo(
    () => ({
      value,
      onTrue,
      onFalse,
      onToggle,
      setValue,
    }),
    [value, onTrue, onFalse, onToggle, setValue]
  );

  return memorizedValue;
};
