import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  List,
  EmptyList,
  TextEmpty,
  SubmitButton,
  EmptyView,
} from './styles';

import Subscription from '~/components/Subscription';

function Registration({ navigation, isFocused }) {
  const [registrations, setRegistrations] = useState([]);

  async function loadRegistrations() {
    const response = await api.get('subscriptions');

    setRegistrations(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadRegistrations();
    }
  }, [isFocused]);

  async function showCanceledPopup() {
    Alert.alert(
      'Aviso',
      'Inscrição cancelada com sucesso.',
      [{ text: 'OK', onPress: () => {} }],
      { cancelable: false }
    );
  }

  async function handleCancel(id) {
    await api.delete(`subscriptions/${id}`);

    loadRegistrations();

    showCanceledPopup();
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

  function handleSearch() {
    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      {registrations.length === 0 ? (
        <EmptyView>
          <EmptyList>
            <Icon name="search" size={60} color="#333" />
            <TextEmpty>
              Você ainda não se inscreveu em nenhum meetup. Que tal procurar em
              nossa lista de meetups?
            </TextEmpty>
            <SubmitButton onPress={handleSearch}>Procurar meetups</SubmitButton>
          </EmptyList>
        </EmptyView>
      ) : (
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
      )}
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

Registration.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Registration.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(Registration);
