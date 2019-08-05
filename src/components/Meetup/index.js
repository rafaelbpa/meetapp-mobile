import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Info,
  Title,
  DateTime,
  Location,
  Organizer,
  HorizontalContainer,
  SubmitButton,
} from './styles';

export default function Meetup() {
  function handleSubmit() {}

  return (
    <Container>
      <Banner
        source={{
          uri: 'https://api.adorable.io/avatars/450/abott@adorable.png',
        }}
      />

      <Info>
        <Title>Meetup de React Native</Title>
        <HorizontalContainer>
          <Icon name="event" color="#999" size={14} />
          <DateTime>24 de junho, às 20h</DateTime>
        </HorizontalContainer>
        <HorizontalContainer>
          <Icon name="place" color="#999" size={14} />
          <Location>Rua Guilherme Gembala, 260</Location>
        </HorizontalContainer>
        <HorizontalContainer>
          <Icon name="person" color="#999" size={14} />
          <Organizer>Organizador: Rafael Araújo</Organizer>
        </HorizontalContainer>
      </Info>

      <SubmitButton onPress={handleSubmit}>Realizar inscrição</SubmitButton>
    </Container>
  );
}
