import React from 'react';
import { TopBarHeader, Logo } from './styles';

import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <>
      <TopBarHeader>
        <Logo source={logo} />
      </TopBarHeader>
    </>
  );
}
