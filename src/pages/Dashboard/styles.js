import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin: 30px 10px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
})``;

export const DateNavigation = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ButtonArrow = styled(Button)`
  background: transparent;
`;
