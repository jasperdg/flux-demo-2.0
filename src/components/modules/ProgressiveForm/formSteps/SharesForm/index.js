import React, { useState } from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';

const RowDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
  opacity: 0.2;
`;

const ActionTitle = styled.h3`
  width: 100%;
  color: white;
  text-align: ${props => props.textAlign ? props.textAlign : 'initial'};
`;

const Input = styled.input.attrs({ type: 'number' })`
  max-width: 5rem;
  border: 1px red dashed;
  padding: 1rem 0 1rem 1rem;
  background-color: transparent;
  color: white;
  font-size: 1rem;
  border: none;
  outline: none;
  margin-right: -1em;
  text-align: right;

  &::placeholder {
    color: ${props => props.theme.gray};
  }
`;

const SharesForm = props => {
  const [numberOfShares, setNumberOfShares] = useState(100);
  const {sharesType} = props;

  const colorMap = {
    yes: 'lightPurple',
    no: 'pink',
  };

  const handleSharesInputChange = (event) => {
    setNumberOfShares(event.target.value);
  }

  return (
      <FlexWrapper
        flexDirection="column"
        height="100%"
      >

        <ContentWrapper
          className="buy_shares"
          backgroundColor={props.layover ? colorMap[props.sharesType] : 'transparent'}
          width="100%"
          padding="2rem"
          >
          <ActionTitle textAlign="center">Buy {props.sharesType[1]} Shares</ActionTitle>
          <FlexWrapper className="input_divider" margin="1rem 0">
            <FlexItem
              color="white"
            >
              Number of Shares
            </FlexItem>
            <FlexItem textAlign="right">
              <Input 
                value={numberOfShares}
                onChange={handleSharesInputChange}
              />
            </FlexItem>
          </FlexWrapper>
          <RowDivider />

          <FlexWrapper margin="1rem 0">
            <FlexItem
              color="white"
            >
              Market Price
            </FlexItem>
            <FlexItem 
              color="white"
              textAlign="right"  
            >
              &#162;{props.sharesType[2] / 100}
            </ FlexItem>
          </FlexWrapper>
          <RowDivider />

          <FlexWrapper margin="1rem 0">
            <FlexItem
              color="white"
            >
              Estimated Cost
            </FlexItem>
            <FlexItem
              color="white"
              textAlign="right"
            >
              &#162;{(numberOfShares * props.sharesType[2]) / 100}
            </FlexItem>
          </FlexWrapper>
          <RowDivider />
        </ContentWrapper>

        <ContentWrapper 
          margin="auto 0 2rem 0"
          width="100%"
          padding={props.layover ? '2rem' : '0 2rem 0 0'}
          textAlign={props.layover ? 'center' : 'right'}
        >
        <Button
            margin="2rem 0 0 0"
            borderColor="transparent"
            onClick={ () => {
              props.formEvent('buttonSelection')
            }}
          >
            Cancel
          </Button>
          <Button
            margin="2rem 0 0 1rem"
            color={colorMap[props.sharesType]}
            onClick={ () => {
              let orderPrice = (numberOfShares * props.sharesType[2]) / 100;
              props.formEvent(['review', numberOfShares, orderPrice]);
            }}
          >
            Review
          </Button>
        </ContentWrapper>

      </FlexWrapper>
  );
}

export default SharesForm;