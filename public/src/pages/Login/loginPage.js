import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginPage.css';
import image1 from '../../assets/images/1.webp';
import image2 from '../../assets/images/2.jpg';
import icon from '../../assets/logo/icon.png';
import 'font-awesome/css/font-awesome.min.css';
// import Icon from '@material-ui/core/Icon';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
class loginPage extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className='loginpage'>
                    {/* <Card className='mainCard'>
                        <CardBody > */}
                    <Row className='mainCard'>
                        <Col sm='6' className='textpart p-5'>
                            <div className='description'>
                            <div className='d-flex left-head'>
                                <label className='mr-1'><img src={icon} alt="Logo" /></label>
                                <h6>Constantsys</h6>
                            </div>
                                <div className='onlytext'> 
                                    <h3 className=''>Get exclusive access <br/> to Constantsys</h3>
                                    <p style={{ fontSize: '13px' }} className='mt-2 text-center'>we are in the process of developing our online platform, where we aim to make the concept as user-friendly as possible. We therefore send out access continuously, focusing on the good customer contact.</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm='6' className='formpart p-5'>
                            <div className='form'>
                                <div className='d-flex heading justify-content-end'>
                                    <Link className='mr-4' style={{ color: 'grey', fontSize: '11px' }}>Don't have an account?</Link>
                                    <button>Create profile</button>
                                </div>
                                <form action="" className="log-in" autocomplete="off">
                                    <div class="user-box">
                                        <input type="text" name="" required="" placeholder='Email' />
                                        <label><i class="fa fa-envelope-o" aria-hidden="true"></i></label>
                                    </div>
                                    <div class="user-box">
                                        <input type="password" name="" required="" placeholder='Password' />
                                        <label><i class="fa fa-key" aria-hidden="true"></i></label>
                                    </div>
                                    <div className='login-button text-center'>
                                        <button>Login</button>
                                    </div>
                                    <div className='text-center'>
                                        <Link style={{ color: 'grey', fontSize: '11px' }}>Forgot password?</Link>
                                    </div>
                                    <div className='social-sites d-flex mt-4'>
                                        <div className="avatar-sm mx-auto">
                                            <span className="avatar-title rounded-circle font-size-18" style={{ 'backgroundColor': '#2851A3' }}>
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="avatar-sm mx-auto">
                                            <span className="avatar-title rounded-circle bg-soft-primary font-size-18" style={{ 'backgroundColor': '#0077b5' }}>
                                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="avatar-sm mx-auto">
                                            <span className="avatar-title rounded-circle bg-soft-primary font-size-18" style={{ 'backgroundColor': 'white' }} >
                                                <i class="fa fa-google" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    {/* </CardBody>
                    </Card> */}
                </div>
            </React.Fragment>
        );
    }
}

export default loginPage;