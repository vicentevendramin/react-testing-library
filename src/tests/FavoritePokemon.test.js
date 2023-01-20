import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemon', () => {
  it('É exibida a mensagem "No favorite pokemon found", caso o usuário não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const message = screen.getByText(/No favorite Pokémon found/i);
    expect(message).toBeInTheDocument();
  });

  it('É possível favoritar um Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);
    expect(favoritePokemon.checked).toBe(true);
  });

  it('Serão exibidos apenas os Pokémons favoritados', () => {
    const pokemonList = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Viridian Forest',
          map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
        },
        {
          location: 'Kanto Power Plant',
          map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
        },
      ],
      summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    }];

    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
