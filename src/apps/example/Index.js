import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends React.PureComponent {
  static propTypes = {
    list: PropTypes.object,
  }

  static defaultProps = {
    list: {},
  }

  render() {
    console.log(this.props.list);
    return (
      <div>react redux hello world</div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.list,
});
export default withRouter(connect(mapStateToProps)(App));
