import React, { createContext } from 'react';

export const  UserContext = createContext({
  userBook: '',
  updateBookname: () => {},
});

export class UserProvider extends React.Component {
    updateBookname = userBook => {
    this.setState({ userBook: userBook });
  };

  state = {
    userBook: [],
    updateBookname: this.updateBookname,
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;
