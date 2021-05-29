import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import './HomePage.css';

class HomePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    render() {
        return (
            < Fragment >
                <h1>Welcome Home Page</h1>
            </Fragment>
        )
    }
}

//Get Props
const mapStateToProps = ({ user }) => ({
    user,
});

export default connect(mapStateToProps, null)(HomePage);