import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon', () => {
  const pokemon = pokemonList[0];
  const { id, name, type, image, averageWeight: { value, measurementUnit } } = pokemon;
  it('Verifica se o componente é renderizado corretamente', () => {
    renderWithRouter(<Pokemon isFavorite={ false } pokemon={ pokemon } />);

    const pokemonName = screen.getByText(name);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByText(type);
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImage = screen.getByAltText(`${name} sprite`);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(image);
  });

  it('Verifica se o componente possui um link para exibir mais detalhes', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(name);
    expect(pikachu).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
  });

  it('Verifica se o link redireciona para a página correta', () => {
    const { history } = renderWithRouter(<App />);

    const pikachu = screen.getByText(name);
    expect(pikachu).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${id}`);

    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheck).toBeInTheDocument();

    userEvent.click(favoriteCheck);

    const favoriteImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg.src).toBe('http://localhost/star-icon.svg');
  });
});
