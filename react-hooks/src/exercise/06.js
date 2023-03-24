import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon';

function PokemonInfo({ pokemonName }) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: pokemonName ? 'pending' : 'idle'
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setState({ pokemon: null, error: null, status: 'pending' });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({
          pokemon: pokemonData,
          status: 'resolved'
        });
      })
      .catch((err) =>
        setState({
          error: err,
          status: 'rejected'
        })
      );
  }, [pokemonName]);

  if (state.status === 'idle') {
    return 'Submit a pokemon';
  } else if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (state.status === 'rejected') {
    // notice how we throw this, we don't have to throw new Error(state.error)
    throw state.error;
  } else if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />;
  }

  throw new Error('This should be impossible');
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <div role="alert">
        There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          key={pokemonName}
          resetKeys={[pokemonName]}
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
