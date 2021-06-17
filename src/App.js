import Profile from './pages/Profile';
import { Container } from 'react-bootstrap';
import MyNavbar from './components/MyNavbar';
import Footer from './components/Footer';
import './css/App.css';
import Feed from './pages/Feed';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Search from './pages/Search';
import Ad from './components/Ad';
import { expsUrl, getExperiences, getProfiles } from './helper/fetchData';
import { checkImg } from './helper/datediff';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didUpdate: false,
      myProfile: [],
      bearerToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNiMDY0ZTk1NmNjZDAwMTU4NTM3NjUiLCJpYXQiOjE2MjM5MTgxNTgsImV4cCI6MTYyNTEyNzc1OH0.vEZaWF1FALwDlLviseLHROpmOu0UPflnkBZKGdja-E4',
      posts: [],
      query: '',
      currProfile: [],
      currProfileId: undefined,
      profiles: [],
      experiences: [],
      filteredPosts: [],
      filteredPeople: [],
    };
  }
  // 609a5eb3dfccc50015a6bbba Ankit
  // Hasib eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk4ZmE0MTYxOWU1ZDAwMTUxZjhmN2YiLCJpYXQiOjE2MjA2MzgyNzMsImV4cCI6MTYyMTg0Nzg3M30.D-RniP4L8eJ8XOdOjRXswq8LsRnPVK-QYiUr8h9fPhk

  filterPeople = () => {
    let query = this.state.query;
    let filteredPeople = this.state.profiles.filter((p) => {
      if (
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.surname.toLowerCase().includes(query.toLowerCase())
      ) {
        return true;
      }
    });

    this.setState((state) => {
      return {
        filteredPeople: filteredPeople,
      };
    });
  };

  filterPosts = () => {
    let query = this.state.query;
    let filteredPosts = this.state.posts.filter((p) => {
      if (p.text.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
    });

    this.setState((state) => {
      return {
        filteredPosts: filteredPosts,
      };
    });
  };
  getMyProfile = async () => {
    try {
      const requestProfile = await fetch(
        'https://striveschool-api.herokuapp.com/api/profile/me',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.state.bearerToken,
          },
        }
      );
      if (requestProfile.ok) {
        const response = await requestProfile.json();
        this.setState({ myProfile: response, didUpdate: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProfile = async () => {
    try {
      const requestProfile = await fetch(
        'https://striveschool-api.herokuapp.com/api/profile/' +
          this.state.currProfileId,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.state.bearerToken,
          },
        }
      );
      if (requestProfile.ok) {
        const response = await requestProfile.json();
        this.setState({ currProfile: response, didUpdate: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getPosts = async () => {
    try {
      const requestPosts = await fetch(
        'https://striveschool-api.herokuapp.com/api/posts/',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + this.state.bearerToken,
          },
        }
      );
      if (requestPosts.ok) {
        let resp = await requestPosts.json();
        let filteredResp = await Promise.all(
          resp.filter(async (post) => await checkImg(post.image))
        );
        this.setState({
          posts: filteredResp.reverse(),
          didUpdate: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    this.getMyProfile();
    this.getPosts();
    let profiles = await getProfiles(this.state.bearerToken);
    this.setState((state) => {
      return {
        profiles: profiles,
      };
    });
    let exps = await getExperiences(this.state.bearerToken, expsUrl);
    this.setState((state) => {
      return {
        experiences: exps,
      };
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.didUpdate !== prevState.didUpdate) {
      this.getMyProfile();
      this.getPosts();
    }
    if (prevState.currProfileId !== this.state.currProfileId) {
      this.getProfile();
    }
    if (prevState.query !== this.state.query) {
      this.filterPeople();
      this.filterPosts();
    }
  }

  handleUpdate = (bool) => {
    this.setState((state) => {
      return { didUpdate: bool };
    });
  };

  handleChangeQuery = (e) => {
    e.preventDefault();
    this.setState((state) => {
      return { query: e.target.value };
    });
  };
  handleCurrProfileChange = (currProfileId) => {
    this.setState((state) => {
      return { currProfileId: currProfileId };
    });
  };

  render() {
    return (
      <>
        <Router>
          <MyNavbar
            name={this.state.myProfile.name}
            image={this.state.myProfile.image}
            query={this.state.query}
            onChangeQuery={this.handleChangeQuery}
          />
          <Container sm="fluid" style={{ marginTop: '8vh' }} className="pt-2">
            {this.state.query.length === 0 && (
              <Ad
                title="Need Developers ASAP? Hire the top 3% of 
        developers in 48 hours. $0
          Recruiting fee. Start now."
              />
            )}
            <Switch>
              <Route
                render={(routerProps) => (
                  <Profile
                    profile={this.state.myProfile}
                    bearerToken={this.state.bearerToken}
                    onDidUpdate={this.handleUpdate}
                  />
                )}
                exact
                path={['/profile']}
              />
              <Route
                render={(routerProps) => (
                  <Profile
                    profile={this.state.currProfile}
                    bearerToken={this.state.bearerToken}
                    onDidUpdate={this.handleUpdate}
                    currProfileId={this.state.currProfileId}
                    onCurrProfileChange={this.handleCurrProfileChange}
                  />
                )}
                path={['/profile/:id']}
              />
            </Switch>
            <Route
              render={(routerProps) => (
                <Feed
                  profile={this.state.myProfile}
                  posts={this.state.posts}
                  bearerToken={this.state.bearerToken}
                  onDidUpdate={this.handleUpdate}
                />
              )}
              exact
              path={['/feed', '/']}
            />
            <Route
              render={(routerProps) => (
                <Search
                  profiles={
                    this.state.filteredPeople.length !== 0
                      ? this.state.filteredPeople
                      : this.state.profiles
                  }
                  posts={
                    this.state.filteredPosts.length !== 0
                      ? this.state.filteredPosts
                      : this.state.posts
                  }
                  bearerToken={this.state.bearerToken}
                />
              )}
              exact
              path={['/Search/q=:query', '/search/q=:query/:filter']}
            />

            <Footer />
          </Container>
        </Router>
      </>
    );
  }
}

export default App;
