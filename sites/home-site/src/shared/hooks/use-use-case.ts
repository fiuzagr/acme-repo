import { useEffect, useRef, useState } from 'react';
import { UseCase } from '@acme/shared-kernel';

function useUseCase<Input, Output>(
  useCase: UseCase<Input, Output>,
  input: Input
) {
  const inputRef = useRef<Input>(input);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Output>();

  useEffect(() => {
    if (!loading && !data) {
      setLoading(true);
      useCase
        .execute(inputRef.current)
        .then((data: Output) => {
          setData(data);
          setLoading(false);
        })
        .catch(console.error);
    }
  }, [inputRef, useCase, loading, data, setLoading, setData]);

  return {
    loading,
    data,
  };
}

export default useUseCase;
