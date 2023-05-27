import "./App.css";
import { useRandom } from "./hook/useRandom";

function App() {
  const { data: number, error, refetch, isFetching } = useRandom();

  return (
    <div className="App App-header">
      {isFetching ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2> There was an error</h2>
      ) : (
        <h2>Random number {number}</h2>
      )}
      <button disabled={isFetching} onClick={() => refetch()}>
        {!isFetching ? "Reload number" : "Loading number"}
      </button>
    </div>
  );
}

export default App;
