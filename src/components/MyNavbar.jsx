import React from "react";
import { Home, SearchOutline } from "react-ionicons";
import { People } from "react-ionicons";
import { Briefcase } from "react-ionicons";
import { ChatboxEllipses } from "react-ionicons";
import { Notifications } from "react-ionicons";
import { Keypad } from "react-ionicons";
import { Link, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  NavDropdown,
  FormControl,
  Image,
  Container,
} from "react-bootstrap";
import mainLogo from "../assets/img/Logo.png";
import "../css/MyNavbar.css";
import FilterBar from "./FilterBar";
class MyNavbar extends React.Component {
  state = { filter: "" };

  handleChangeQuery = (e) => {
    this.props.onChangeQuery(e);
    const history = this.props.history;
    if (e.target.value.length > 0) {
      if (this.state.filter === "") {
        this.props.history.push("/search/q=" + e.target.value);
      } else {
        history.push(
          `${this.props.match.path}search/q=${this.props.query}/${this.state.filter}`
        );
      }
    }
  };

  handleFilterChange = (e) => {
    if (e.target.id === this.state.filter) {
      this.setState({ filter: "" });
    } else {
      this.setState({ filter: e.target.id });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.pushFilter();
    }
  }

  pushFilter() {
    const history = this.props.history;
    history.push(
      `${this.props.match.path}search/q=${this.props.query}/${this.state.filter}`
    );
  }

  render() {
    return (
      <header className='fixed-top'>
        <Container sm='fluid'>
          <Navbar className='nav-styles' bg='white' expand='lg'>
            <Navbar.Brand as={Link} to='/' className='pr-0 mr-1'>
              <Image src={mainLogo} rounded className='linkedin_logo' />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <Form
                  className='searchBar d-flex flex-row align-items-center'
                  style={{ backgroundColor: "#EEF3F8" }}>
                  <SearchOutline
                    color={"#00000"}
                    title={"search"}
                    height='20px'
                    className='ml-2'
                    width='20px'
                  />
                  <FormControl
                    type='text'
                    id='search'
                    placeholder='Search'
                    value={this.props.query}
                    onChange={this.handleChangeQuery}></FormControl>
                </Form>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to='/feed'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Home
                      color={"#00000"}
                      title={""}
                      height='20px'
                      width='20px'
                    />{" "}
                  </div>
                  <span>Home</span>
                </Nav.Link>
                <Nav.Link href='#link'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <People
                      color={"#00000"}
                      title={""}
                      height='20px'
                      width='20px'
                    />
                  </div>
                  <span>My Networks</span>
                </Nav.Link>
                <Nav.Link href='#link'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Briefcase
                      color={"#00000"}
                      title={""}
                      height='20px'
                      width='20px'
                    />
                  </div>
                  <span>Jobs</span>
                </Nav.Link>
                <Nav.Link href='#link'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <ChatboxEllipses
                      color={"#00000"}
                      title={""}
                      height='20px'
                      width='20px'
                    />
                  </div>
                  <span>Messaging</span>
                </Nav.Link>
                <Nav.Link href='#link'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Notifications
                      color={"#00000"}
                      title={""}
                      height='20px'
                      width='20px'
                    />
                  </div>
                  <span>Notifications</span>
                </Nav.Link>
                <div className='d-flex flex-column justify-content-center align-items-center ml-3'>
                  <span>
                    {
                      <img
                        src={this.props.image}
                        alt='profile'
                        style={{ height: "20px", width: "20px" }}
                        className='rounded-circle'
                      />
                    }
                  </span>
                  <NavDropdown title='Me' id='basic-nav-dropdown'>
                    <NavDropdown.Item as={Link} to='/profile'>
                      {this.props.name}
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.2'>
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.3'>
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#action/3.4'>
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                <div className='vr'></div>
                <div className='mt-2 ml-3'>
                  <span>
                    <Keypad
                      className='user-icon'
                      color={"#00000"}
                      title={""}
                      height='20px'
                      width='20px'
                    />
                  </span>
                  <NavDropdown title='Work' id='basic-nav-dropdown'>
                    <NavDropdown.Item href='#action/3.1'>
                      {this.props.name}
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.2'>
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.3'>
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#action/3.4'>
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                <Nav.Link className='premium'>
                  <span className='d-flex justify-content-center text-center'>
                    Retry Premium <br></br> Free
                  </span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        {this.props.query.length > 0 && (
          <FilterBar
            query={this.props.query}
            filter={this.state.filter}
            onFilterChange={this.handleFilterChange}
          />
        )}
      </header>
    );
  }
}

export default withRouter(MyNavbar);
