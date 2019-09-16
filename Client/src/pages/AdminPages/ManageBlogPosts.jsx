import React from 'react';


import {
    TabContent,
    TabPane,
    Container,
    Row,
    Card,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    CardBody,
    Col
  } from "reactstrap";

import CreateBlog from '../../components/BlogPost/CreateBlogPost';
import ManagePost from 'components/BlogPost/ManagePost';
import Messaging from 'components/Messaging/Messaging';
import SingleMessage from 'components/Messaging/SingleMessage';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from "../../redux/user/user.selector";

const ManageBlogPost = ({ currentUser }) => {
    // if(!currentUser) {
    //     // history
    // }
    const [iconPills, setIconPills] = React.useState("1");
        return (
            <>
            <div style={{padding: '2rem'}}>

            </div>
            <div className="section section-tabs">
                <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="10" xl="8">
                    <Card>
                        <CardHeader>
                        <Nav className="justify-content-center" role="tablist" tabs>
                            <NavItem>
                            <NavLink
                                className={iconPills === "1" ? "active" : ""}
                                href="#pablo"
                                onClick={e => {
                                e.preventDefault();
                                setIconPills("1");
                                }}
                            > <i className="fas fa-plus-square"></i> Create
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink
                                className={iconPills === "2" ? "active" : ""}
                                href="#pablo"
                                onClick={e => {
                                e.preventDefault();
                                setIconPills("2");
                                }}
                            >
                                <i class="fas fa-tasks"></i> Manage
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink
                                className={iconPills === "3" ? "active" : ""}
                                href="#pablo"
                                onClick={e => {
                                e.preventDefault();
                                setIconPills("3");
                                }}
                            >
                                <i className="fas fa-envelope"></i> Broadcast Message
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink
                                className={iconPills === "4" ? "active" : ""}
                                href="#pablo"
                                onClick={e => {
                                e.preventDefault();
                                setIconPills("4");
                                }}
                            >
                                <i class="fas fa-envelope"></i> Single Message
                            </NavLink>
                            </NavItem>
                        </Nav>
                        </CardHeader>
                        <CardBody>
                        <TabContent
                            className="text-center"
                            activeTab={"iconPills" + iconPills}
                        >
                        <TabPane tabId="iconPills1">
                        <CreateBlog/>
                        </TabPane>
                        <TabPane tabId="iconPills2">
                        <ManagePost />
                        </TabPane>
                        <TabPane tabId="iconPills3">
                        <Messaging />
                        </TabPane>
                        <TabPane tabId="iconPills4">
                            <SingleMessage />
                        </TabPane>
                    </TabContent>
                    </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    </Container>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    </div>
            </>
        );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
  });

export default connect(mapStateToProps, null)(ManageBlogPost);