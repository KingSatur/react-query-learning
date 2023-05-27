import { useEffect, useReducer, useState } from "react";
import "./App.css";

const getNumberFromApi = async (): Promise<number> => {
  const res = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new"
  );
  const data = await res.text();

  return +data;
};

function App() {
  const [number, setNumber] = useState<number | null>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsLoading(true);
    getNumberFromApi()
      .then((numberApi) => {
        setNumber(numberApi);
      })
      .catch((err) => {
        setError(JSON.stringify(err));
      });
  }, [state]);

  useEffect(() => {
    if (number) {
      setIsLoading(false);
    }
  }, [number]);

  useEffect(() => {
    if (error) {
      setNumber(null);
      setIsLoading(false);
    }
  }, [error]);

  return (
    <div className="App App-header">
      {isLoading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2> There was an error</h2>
      ) : (
        <h2>Random number {number}</h2>
      )}
      <button disabled={isLoading} onClick={() => dispatch()}>
        {!isLoading ? "Reload number" : "Loading number"}
      </button>
    </div>
  );
}

export default App;
