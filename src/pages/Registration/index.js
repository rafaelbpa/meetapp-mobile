import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, List } from './styles';

import Subscription from '~/components/Subscription';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('subscriptions');

      setRegistrations(response.data);
    }

    loadRegistrations();
  }, [registrations]);

  async function showCanceledMeetupPopup() {
    Alert.alert(
      'Aviso',
      'Inscrição cancelada com sucesso.',
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    );
  }

  async function handleCancel(id) {
    const response = await api.delete(`subscriptions/${id}`);

    setRegistrations(
      registrations.map(registration =>
        registration.id === id
          ? {
              ...registration,
              canceled_at: response.data.canceled_at,
            }
          : registration
      )
    );

    showCanceledMeetupPopup();
  }

  async function confirmCancelation(id) {
    Alert.alert(
      'Aviso',
      'Deseja mesmo cancelar sua inscrição neste meetup?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => handleCancel(id),
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Background>
      <Container>
        <List
          data={registrations}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Subscription
              onCancel={() => confirmCancelation(item.id)}
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

Registration.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
