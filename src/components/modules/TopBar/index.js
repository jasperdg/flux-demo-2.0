import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDarkModeTheme } from '../../../App';

// common
import ThemeToggler from '../../common/ThemeToggler';
import { FlexWrapper, FlexItem } from '../../common/Flex';
import ContentWrapper from '../../common/ContentWrapper';
import Button from '../../common/Button';

// context
import { FluxContext } from '../../../context/FluxProvider';

const Logo = styled.img`
  width: 4rem;
`;

const TopBar = props => {
  const {
    toggleTheme,
  } = useDarkModeTheme();
  const [flux, ] = useContext(FluxContext);
  
  return (
    <ContentWrapper
      backgroundColor="darkBlue"
      addPadding
    >
      <ContentWrapper maxWidth>
        <FlexWrapper padding="0 1rem">
          <FlexItem>
            <Logo 
              src={require(`../../../assets/images/flux-logo.png`)}
              alt="Flux"
            />
          </FlexItem>
          <FlexItem>
            search
          </FlexItem>
          <FlexItem>
            buttons
          </FlexItem>
          <FlexItem>
            profile
          </FlexItem>
          <FlexItem textAlign="right">
            <Button 
              color="gray"
              small
              onClick={ () => flux.signInProtocol()}
            >
              Login
            </Button>
            <ThemeToggler toggleTheme={toggleTheme} />
          </FlexItem>

        </FlexWrapper>
      </ContentWrapper>
    </ContentWrapper>
  );
}

export default TopBar;