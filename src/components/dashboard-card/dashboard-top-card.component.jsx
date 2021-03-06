import {
    CardBody,
    CardHeaderContainer,
    CurrentSpendAmount,
    SpendAmount,
    CurrentSpend
} from './dashboard-top-card.styles';

import { CardContainer } from '../card/card.styles';

const DashboardTopCard = () => {
    return (
        <CardContainer>
            <CardBody>
                <CardHeaderContainer>
                    <div>
                        <CurrentSpend>Current spend this month</CurrentSpend>
                        <CurrentSpendAmount>
                            <SpendAmount>$320</SpendAmount>
                        </CurrentSpendAmount>
                    </div>
                </CardHeaderContainer>
            </CardBody>
        </CardContainer>
    );
};

export default DashboardTopCard;
