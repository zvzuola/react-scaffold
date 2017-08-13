import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends React.PureComponent {
  render() {
    console.log(this.props.list);
    return (
      <div>redux hello world</div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.list,
});
export default withRouter(connect(mapStateToProps)(App));
