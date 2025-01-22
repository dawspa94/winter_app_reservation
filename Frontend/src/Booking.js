import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f0f8ff;
`;

const Header = styled.header`
  background-image: url('/images/winter-background.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 20px;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Półprzezroczyste tło */
  z-index: 1;
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3em;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Cień do tekstu */
`;

const Subtitle = styled.p`
  font-size: 1.5em;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Cień do tekstu */
`;

const Button = styled.button`
  background-color: #0077b6;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f8a;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
`;

const Section = styled.section`
  flex: 1;
  margin: 0 20px;
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Home = () => {
  return (
    <Container>
      <Header>
        <Overlay />
        <HeaderContent>
          <Title>Witamy w Winter Rental</Title>
          <Subtitle>Rezerwuj swój sprzęt zimowy w prosty sposób!</Subtitle>
          <Button>Zobacz ofertę</Button>
          <Button>Kontakt</Button>
        </HeaderContent>
      </Header>
      <SectionContainer>
        <Section>
          <h2>O nas</h2>
          <p>Winter Rental to najlepsze miejsce do wypożyczania sprzętu zimowego. Oferujemy szeroki wybór nart, snowboardów i akcesoriów.</p>
        </Section>
        <Section>
          <h2>Nasza oferta</h2>
          <p>Posiadamy sprzęt dla początkujących, jak i zaawansowanych narciarzy i snowboardzistów. Wszystkie nasze produkty są regularnie serwisowane i gotowe do użycia.</p>
        </Section>
        <Section>
          <h2>Kontakt</h2>
          <p>Masz pytania? Skontaktuj się z nami pod numerem telefonu 123-456-789 lub napisz na email: kontakt@winterrental.pl</p>
        </Section>
      </SectionContainer>
    </Container>
  );
};

export default Home;