import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About', () => {
  it('Testa se a página possui um Heading com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém 2 parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphOne = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const paragraphTwo = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem correta de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText('Pokédex');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
