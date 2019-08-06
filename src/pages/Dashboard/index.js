import React, { useEffect, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Title, List, DateNavigation, ButtonArrow } from './styles';

import Meetup from '~/components/Meetup';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date,
        },
      });

      setMeetups(response.data);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [date, isFocused]);

  async function showMessage(title, message) {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => {} }], {
      cancelable: false,
    });
  }

  async function handleRegister(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      showMessage('Obrigado', 'Inscrição realizada com sucesso.');
    } catch (err) {
      await showMessage('Oops', 'Erro ao se cadastrar no meetup.');
    }
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <Container>
        <DateNavigation>
          <ButtonArrow onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </ButtonArrow>
          <Title>{dateFormatted}</Title>
          <ButtonArrow onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </ButtonArrow>
        </DateNavigation>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup onRegister={() => handleRegister(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="list" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(Dashboard);
