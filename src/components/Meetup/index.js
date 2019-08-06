import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
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

export default function Meetup({ data, onRegister }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), `dd 'de' MMMM 'às' HH'h'`, {
      locale: pt,
    });
  }, [data.date]);

  return (
    <Container>
      <Banner
        source={{
          uri: data.File
            ? data.File.url
            : 'https://api.adorable.io/avatars/450/abott@adorable.png',
        }}
      />

      <Info>
        <Title>{data.title}</Title>
        <HorizontalContainer>
          <Icon name="event" color="#999" size={14} />
          <DateTime>{dateParsed}</DateTime>
        </HorizontalContainer>
        <HorizontalContainer>
          <Icon name="place" color="#999" size={14} />
          <Location>{data.location}</Location>
        </HorizontalContainer>
        <HorizontalContainer>
          <Icon name="person" color="#999" size={14} />
          <Organizer>Organizador: {data.User.name}</Organizer>
        </HorizontalContainer>
      </Info>

      <SubmitButton onPress={onRegister}>Realizar inscrição</SubmitButton>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
  onRegister: PropTypes.func.isRequired,
};
