import React, { useEffect, useState, useMemo } from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Title,
  List,
  DateNavigation,
  ButtonArrow,
  EmptyList,
  EmptyView,
  TextEmpty,
} from './styles';

import Meetup from '~/components/Meetup';
import Header from '~/components/Header';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  function loadMoreItems() {
    if (meetups.length >= 10) {
      setPage(page + 1);
      setLoadMore(true);
    }
  }

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('meetups', {
        params: {
          date,
          page,
        },
      });

      const data = page >= 2 ? [...meetups, ...response.data] : response.data;

      setMeetups(data);
      setLoading(false);
      setLoadMore(false);
    }

    if (isFocused && loadMore) {
      loadMeetups();
      setLoadMore(false);
    }
  }, [date, isFocused, loadMore, meetups, page]);

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
    setMeetups([]);
    setLoadMore(true);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setMeetups([]);
    setLoadMore(true);
  }

  function renderFooter() {
    if (!loading) return null;
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Background>
      <Header />
      <DateNavigation>
        <ButtonArrow onPress={handlePrevDay}>
          <Icon name="chevron-left" size={30} color="#fff" />
        </ButtonArrow>
        <Title>{dateFormatted}</Title>
        <ButtonArrow onPress={handleNextDay}>
          <Icon name="chevron-right" size={30} color="#fff" />
        </ButtonArrow>
      </DateNavigation>
      {meetups.length === 0 ? (
        <EmptyView>
          <EmptyList>
            <Icon name="event-busy" size={60} color="#333" />
            <TextEmpty>Não tem nenhum meetup hoje. :(</TextEmpty>
          </EmptyList>
        </EmptyView>
      ) : (
        <Container>
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup onRegister={() => handleRegister(item.id)} data={item} />
            )}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        </Container>
      )}
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
