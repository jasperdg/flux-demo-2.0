import React, { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

// common
import ContentWrapper from '../../components/common/ContentWrapper';
import MarketDetailData from '../../components/modules/MarketDetailData';
import { FlexWrapper, FlexItem } from '../../components/common/Flex';
import ContentCard from '../../components/common/ContentCard';
import PositionedLabel from '../../components/common/PositionedLabel';
import Button from '../../components/common/Button';
import Layover from '../../components/common/Layover';
import Paragraph from '../../components/common/Paragraph';

// modules
import MainHeader from '../../components/modules/MainHeader';
import ProgressiveForm from '../../components/modules/ProgressiveForm';

// context
import { FluxContext } from '../../context/FluxProvider';

// hooks
import useWindowDimensions from '../../hooks/useWindowDimensions';

const PurchaseWrapper = styled.div`
  width: 100%;
`;

const signUpBackground = require('../../assets/images/signup-background.png');
const SignUpBlock = styled.div`
  background: url(${signUpBackground}) no-repeat;
  background-size: cover;
  padding: 2rem;
  border-radius: 2rem;
  overflow: hidden;
`;

const MarketOverview = props => {
  const { id } = useParams();
  const [flux, _] = useContext(FluxContext);
  const [market, setMarket] = useState({});
  const { width } = useWindowDimensions();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getMarket();
  }, []);

  const getMarket = async () => {
    const market = await flux.getMarket(id);
    setMarket(market[0]);
  }

  return (
    <ContentWrapper>
      <MainHeader market={market} />
      <ContentWrapper backgroundColor="darkBlue">
        <ContentWrapper
          maxWidth
          paddingSmall="0"
        >
          <FlexWrapper 
            flexDirection="column"
            columnForSmall
            alignItems="flex-start"
          >
            <FlexItem 
              width="100%"
              paddingMedium="0 1rem 0 0"
              paddingLarge="0 4rem 0 0"
            >
              <MarketDetailData market={market} />
            </FlexItem>
            <FlexItem
             width="100%"
             height="100%"
             paddingMedium="2rem 0 0 1rem"
             paddingLarge="2rem 4rem 0 0"
             >
              <ContentWrapper>
                <ContentCard
                  paddingMedium="0"
                  smallNoRadius
                  backgroundColor="mediumBlue"
                >
                  
                  {/* buying power: mobile */}
                  {width < 650 &&
                    <ContentWrapper width="100%">
                      <FlexWrapper>
                        <PositionedLabel position="left">Buying power</PositionedLabel>
                        <PositionedLabel position="right">
                          <strong>$150.000</strong>
                        </PositionedLabel>
                      </FlexWrapper>
                      <FlexWrapper 
                        margin="3rem 0"
                      >
                        <FlexItem>
                          <ContentWrapper>
                            <strong>total volume</strong>
                          </ContentWrapper>
                          10,500
                        </FlexItem>
                        <FlexItem textAlign="right">
                          <Button
                            maxWidth="10rem"
                            shadow
                            width="100%"
                            color="lightPurple"
                            onClick={ () => {
                              setShowForm(true);
                              document.body.classList.add('layover');
                            }}
                          >Trade</Button>
                        </FlexItem>
                      </FlexWrapper>
                    </ContentWrapper>
                  }

                  {/* purchase shares: tablet/desktop */}
                  {width >= 650 &&
                    <PurchaseWrapper>
                      <ProgressiveForm market={market} />
                    </PurchaseWrapper>
                  }

                </ContentCard>
                {/* <ProgressiveForm /> */}
              </ContentWrapper>
            </FlexItem>
          </FlexWrapper>

          <ContentWrapper
            margin="2rem 0 0 0"
            padding="1rem"
          >
            <Paragraph
              size="1.5rem"
              fontWeight="bold"
              maxWidth="55rem"
              margin="0 auto"
            >
              Extra info
            </Paragraph>
            <Paragraph
              size="1rem"
              maxWidth="55rem"
              margin="2rem auto"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </Paragraph>

            <SignUpBlock>
            <Paragraph
              size="1.7rem"
              fontWeight="bold"
              maxWidth="17rem"
            >
              Sign up to receive $5 for trading!
            </Paragraph>
            <Button 
              color="black"
              margin="1.5rem 0 0 0"
              padding="1rem"
              onClick={ () => {
                //
              }}
            >
              Sign up now!
            </Button>
          </SignUpBlock>
          </ContentWrapper>

        </ContentWrapper>
      </ContentWrapper>

      {/* layover for mobile */}
      {(width < 650 && showForm) &&
        <Layover>
          <FlexWrapper height="100%">
            <ProgressiveForm layover market={market} />
          </FlexWrapper>
        </Layover>
      }

    </ContentWrapper>
  );
}

export default MarketOverview;