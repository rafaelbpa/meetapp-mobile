import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
  padding: 0;
  margin-bottom: 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  margin-left: 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

export const HorizontalContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const DateTime = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const Location = styled.Text`
  font-size: 14px;
  color: #999;
  margin-left: 5px;
`;

export const Organizer = styled.Text`
  font-size: 14px;
  color: #999;
  margin-left: 5px;
`;

export const SubmitButton = styled(Button)`
  margin: 10px 20px 20px;
`;
