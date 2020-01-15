import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
// import Maximise from '../../assets/maximise.svg';
import Minimise from '../../assets/minimise.svg';
import Refresh from '../../assets/refresh.svg';

// RefreshButton refreshes the conversation in App. The property of
// refreshDisabled property disables the refresh button while the bot is typing.
const Header = (props) => {
  const {
    minimise, minimiseFunc, refresh, refreshDisabled,
  } = props;
  return (
    <StyledHeader minSize={minimise === true ? 'minSize' : ''}>
      <MinimiseButton onClick={minimiseFunc}>
        <Icon
          src={minimise ? Maximise : Minimise}
          alt={minimise ? 'Maximise' : 'Minimise'}
        />
      </MinimiseButton>
      <RefreshButton onClick={refresh} disabled={refreshDisabled}>
        <Icon src={Refresh} alt="refresh" />
      </RefreshButton>

      <HeadingText>
        <Styledh1>
          {minimise === true ? 'Can I help you?' : 'Little Window'}
        </Styledh1>
      </HeadingText>
    </StyledHeader>
  );
};

Header.propTypes = {
  refresh: PropTypes.func.isRequired,
  refreshDisabled: PropTypes.bool.isRequired,
  minimise: PropTypes.bool.isRequired,
  minimiseFunc: PropTypes.func.isRequired,
};

export default Header;
