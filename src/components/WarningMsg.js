import React from 'react';
import { Alert, Row, Col } from 'react-bootstrap';

const WarningMsg = () => {
  return (
    <Row className="padding-lg">
      <Col md="12">
        <Alert variant="warning">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Sorry to Inform you some of our script coming through un-secure server.<br/>
            To go ahead please allow this site to load that script.<br/><br/>
            <img src="https://support.palcs.org/hc/article_attachments/360002315187/load_unsafe_scripts.PNG"
                alt="Load Unsafe Scipt"/>
          </p>
        </Alert>
      </Col>
    </Row>
  );
};

export default WarningMsg;
