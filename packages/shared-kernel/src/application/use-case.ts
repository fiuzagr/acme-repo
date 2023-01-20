interface UseCase<Input, Output> {
  execute: (dto: Input) => Promise<Output>;
}

export default UseCase;
