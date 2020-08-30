import React from 'react';
import styled from 'styled-components';

// common
import ContentWrapper from '../../../../common/ContentWrapper';
import { FlexWrapper, FlexItem } from '../../../../common/Flex';
import Button from '../../../../common/Button';
import Paragraph from '../../../../common/Paragraph';

const RowDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
  opacity: 0.2;
`;

const OptionLabel = styled.span`
  font-size: 1.2rem;
  color: white;
`;

const ButtonSelection = props => {
  const { market, marketPricesData, lastFilledPrices } = props;

  const outcomeTags = market.outcomes > 2 ? market.outcome_tags : ["NO", "YES"];

  console.log('this are the props', props);

  return (
    <ContentWrapper>
      {market.outcomes &&
        <ContentWrapper>

          <FlexWrapper 
            margin="2rem 0"
          >
            <FlexItem>
              <Paragraph
                size="0.8rem"
                color="white"
              >
                Contract
              </Paragraph>
            </FlexItem>
            <FlexItem>
              <Paragraph
                size="0.8rem"
                color="white"
              >
                market price
              </Paragraph>
            </FlexItem>
            <FlexItem></FlexItem>
          </FlexWrapper>

        {props.market.outcomes && outcomeTags.map((contract, index) => (
          <div 
            key={contract + index}
            className="contractRow"
          >
              <FlexWrapper 
                margin="1rem 0"
              >
              <FlexItem>
        
                <OptionLabel>
                  {contract}
                </OptionLabel>
              </FlexItem>
              <FlexItem>
                <OptionLabel>
                  <strong>&#162;{marketPricesData[index] ? marketPricesData[index].marketPrice : "-"}</strong>
                </OptionLabel>
              </FlexItem>
              <FlexItem>
                <Button
                  small={props.layover}
                  shadow
                  width="100%"
                  color={'lightPurple'}
                  onClick={ () => {
                    let userSelection = [marketPricesData[index], contract, lastFilledPrices[index], index]
                    props.buttonEvent(userSelection);
                  }}
                >
                  BUY
                </Button>
              </FlexItem>
            </FlexWrapper>

            {(index === 0 && !props.layover) &&
              <RowDivider />
            }
          </div>
        ))}
          
        </ContentWrapper>
      }
    </ContentWrapper>
  );
}

export default ButtonSelection;