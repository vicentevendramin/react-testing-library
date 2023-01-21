import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  const { id, name, summary, foundAt } = pokemonList[0];

  it('Verifica as se as informações do Pokémon selecionado estão na tela', () => {
    const { history } = renderWithRouter(<App />);

    const pokemon = screen.getByText(name);
    expect(pokemon).toBeInTheDocument();

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${id}`);

    const detailsTxt = screen.getByText(`${name} Details`);
    expect(detailsTxt).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const pokemonSumm = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(pokemonSumm).toBeInTheDocument();

    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se na página existe uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const pokemon = screen.getByText(name);
    expect(pokemon).toBeInTheDocument();

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${id}`);

    const heading = screen.getByRole('heading', { level: 2, name: `Game Locations of ${name}` });
    expect(heading).toBeInTheDocument();

    const locations = screen.getAllByAltText(`${name} location`);
    expect(locations.length).toBe(2);

    expect(locations[0].src).toBe(foundAt[0].map);
    expect(locations[1].src).toBe(foundAt[1].map);
  });

  it('Verifica se é possível favoritar o Pokémon pelo componente PokemonDetails', () => {
    const { history } = renderWithRouter(<App />);

    const pokemon = screen.getByText(name);
    expect(pokemon).toBeInTheDocument();

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${id}`);

    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheck).toBeInTheDocument();

    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toBe(true);

    userEvent.click(favoriteCheck);
    expect(favoriteCheck.checked).toBe(false);
  });
});
