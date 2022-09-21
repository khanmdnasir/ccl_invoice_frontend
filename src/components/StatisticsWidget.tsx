import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import styled from 'styled-components';

interface StatisticsWidgetProps {
    variant: string;
    description: string;
    stats: string;
    image: string;
    color: string;
    counterOptions?: any;
}

const Image = styled.img`
    height: 45px;
`

const StatisticsWidget = (props: StatisticsWidgetProps) => {
    return (
        <>
            <Card className="widget-rounded-circle" style={{backgroundColor: props['color']}}>
                <Card.Body>
                    <Row>
                        <Col >
                            <div className="text-center">
                                <Image src={props['image']} />
                                <p className="text-white mt-1 text-truncate">{props['description']}</p>
                                
                                { parseInt(props['stats']) < 0 ?
                                <h3 className="text-danger mt-1">
                                    <span>
                                        <CountUp duration={1} end={props['stats']} {...props['counterOptions']} />
                                    </span>
                                </h3>:
                                <h3 className="text-white mt-1">
                                    <span>
                                        <CountUp duration={1} end={props['stats']} {...props['counterOptions']} />
                                    </span>
                                </h3>
                                }
                                
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default StatisticsWidget;
