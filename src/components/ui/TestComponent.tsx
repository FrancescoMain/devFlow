export interface IAppProps {}

export function TestComponent(_props: IAppProps) {
  function handleClickToggle() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <div>
      <button onClick={() => handleClickToggle()}>Toggle theme</button>
    </div>
  );
}
