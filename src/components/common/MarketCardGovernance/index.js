import React from 'react';
import styled from 'styled-components';

// common
import Button from '../Button';

// temp data, will use market prop
const governanceRows = [
  {
    label: 'Yes',
    color: 'lightPurple',
    action: '',
  },
  {
    label: 'No',
    color: 'pink',
    action: '',
  },
  {
    label: 'Invalid',
    color: 'darkBlue',
    action: '',
  },
];

const MarketGovernanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem;
  background-color: ${props => props.theme.contentCardBackground};
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0px 3px 20px rgba(0,0,0,0.2);

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: -3rem;
    left: 0;
    width: 100%;
    height: 3rem;
    background-color: ${props => props.theme.contentCardBackground};
  }
`;

const ContainerRow = styled.div`
  display: flex;
  flex:1;
  margin-top: ${props => props.marginTop ? '2rem' : 0};
  margin-bottom: 0.5rem;
`;

const ContainerColumn = styled.div`
  margin-right: ${props => props.position === 'left' ? 'auto' : 'initial'};
  margin-left: ${props => props.position === 'right' ? 'auto' : 'initial'};
`;

const MarketCardGovernance = props => {
  return (
      <MarketGovernanceContainer>

        {governanceRows.map((governanceRow, index) => (
          <ContainerRow key={governanceRow.label}>
            <ContainerColumn position="left">
              {governanceRow.label}
            </ContainerColumn>
            <ContainerColumn position="right">
              <Button
                color={governanceRow.color}
                borderColor="white"
              >
                Stake
              </Button>
            </ContainerColumn>
          </ContainerRow>
        ))}

          <ContainerRow marginTop>
            <ContainerColumn position="left">
              Total Volume
            </ContainerColumn>
            <ContainerColumn position="right">
              10,500 DAI
            </ContainerColumn>
          </ContainerRow>
        
      </MarketGovernanceContainer>
  );
}

export default MarketCardGovernance;