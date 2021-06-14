import React from 'react';
import { Card } from 'react-bootstrap';
import '../css/YourDashboard.css';
import { People } from 'react-ionicons';
import { Bookmark } from 'react-ionicons';
import { CashOutline } from 'react-ionicons';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const YourDashboard = () => {
  return (
    <>
      <Card id="dashCard">
        <Card.Body className="px-0 pt-0">
          <Card style={{ backgroundColor: '#dce6f1' }} className="pb-4">
            <div
              className="d-flex justify-content-between bg-light px-3"
              style={{ borderRadius: '10px' }}
            >
              <div
                className="dashBoardContent"
                style={{ width: '33.3%', borderRight: '1px solid gray' }}
              >
                <h3 className="text-primary" style={{ fontWeight: 'normal' }}>
                  5
                </h3>
                <p>Who viewed your profile</p>
              </div>
              <div
                className="ml-3 dashBoardContent"
                style={{ width: '33.3%', borderRight: '1px solid gray' }}
              >
                <h3 className="text-primary" style={{ fontWeight: 'normal' }}>
                  0
                </h3>
                <p>Article views</p>
              </div>
              <div className="ml-3 dashBoardContent" style={{ width: '33.3%' }}>
                <h3 className="text-primary" style={{ fontWeight: 'normal' }}>
                  5
                </h3>
                <p>Search apperances</p>
              </div>
            </div>
          </Card>
          <Card id="dashCardComponent">
            <Card.Body>
              <p className="dashBoardContent">
                <CashOutline
                  color={'#4e4e4e'}
                  title={'cashicon'}
                  height="25px"
                  width="25px"
                />
                Creator Mode: off
              </p>
              <span className="text-muted mutedText mt-1 dashBoardContent">
                Keep track of your jobs, courses and articles
              </span>
              <hr />
              <p className="dashBoardContent">
                <People
                  color={'#00000'}
                  title={'peopleicon'}
                  height="25px"
                  width="25px"
                />
                Manage my network
              </p>
              <span className="text-muted mutedText mt-1 dashBoardContent">
                Keep track of your jobs, courses and articles
              </span>
              <hr />
              <p className="dashBoardContent">
                <CashOutline
                  color={'#4e4e4e'}
                  title={'cashicon'}
                  height="25px"
                  width="25px"
                />
                Salary insights
              </p>
              <span className="text-muted mutedText mt-1 dashBoardContent">
                See how your salary compares to others in the community{' '}
              </span>
              <hr />
              <p className="dashBoardContent">
                <Bookmark
                  color={'#4e4e4e'}
                  title={'bookmarkicon'}
                  height="25px"
                  width="25px"
                />
                My items
              </p>
              <span className="text-muted mutedText mt-1 dashBoardContent">
                Keep track of your jobs, courses and articles
              </span>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  );
};

export default YourDashboard;
