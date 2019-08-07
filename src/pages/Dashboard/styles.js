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

export const EmptyView = styled.SafeAreaView`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  margin: 40px;
`;

export const EmptyList = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
  align-items: center;
  justify-content: space-around;
  align-content: center;
  height: 50%;
  width: 100%;
`;

export const TextEmpty = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0 20px;
  color: #333;
`;
