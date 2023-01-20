import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém o título correto', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se o próximo Pokémon da lista é exibido ao clicar no botão "Próximo Pokémon"', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(button).toBeInTheDocument();

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();

    userEvent.click(button);

    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
  });

  it('O primeiro Pokémon da lista deve ser mostrado, se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(button).toBeInTheDocument();

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();

    for (let i = 1; i <= 9; i += 1) {
      userEvent.click(button);
    }

    const verifyPokemon = screen.getByText('Pikachu');
    expect(verifyPokemon).toBeInTheDocument();
  });

  it('Testa se os botões de filtragem funcionam', () => {
    renderWithRouter(<App />);

    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(7);

    userEvent.click(buttons[0]);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(buttons[1]);

    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(buttons[2]);

    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();

    userEvent.click(buttons[3]);

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeInTheDocument();

    userEvent.click(buttons[4]);

    const alakazam = screen.getByText('Alakazam');
    expect(alakazam).toBeInTheDocument();

    userEvent.click(buttons[5]);

    const snorlax = screen.getByText('Snorlax');
    expect(snorlax).toBeInTheDocument();

    userEvent.click(buttons[6]);

    const dragonair = screen.getByText('Dragonair');
    expect(dragonair).toBeInTheDocument();

    const allButton = screen.getByRole('button', { name: /All/i });

    userEvent.click(allButton);

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});
