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

import CreateBlogPost from '../../components/BlogPost/CreateBlogPost';
import ManagePost from 'components/BlogPost/ManagePost';

const ManageBlogPost = () => {
    const [iconPills, setIconPills] = React.useState("1");
    const [pills, setPills] = React.useState("1");
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
                            >
                                <i className="now-ui-icons objects_umbrella-13"></i>
                                Create
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
                                <i className="now-ui-icons shopping_cart-simple"></i>
                                Manage
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
                                <i className="now-ui-icons shopping_shop"></i>
                                Upload Pic
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
                                <i className="now-ui-icons ui-2_settings-90"></i>
                                Settings
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
                        <CreateBlogPost/>
                        </TabPane>
                        <TabPane tabId="iconPills2">
                        <ManagePost />
                        </TabPane>
                        <TabPane tabId="iconPills3">
                        <p>
                            I think that’s a responsibility that I have, to push
                            possibilities, to show people, this is the level that
                            things could be at. So when you get something that has
                            the name Kanye West on it, it’s supposed to be pushing
                            the furthest possibilities. I will be the leader of a
                            company that ends up being worth billions of dollars,
                            because I got the answers. I understand culture. I am
                            the nucleus.
                        </p>
                        </TabPane>
                        <TabPane tabId="iconPills4">
                        <p>
                            "I will be the leader of a company that ends up being
                            worth billions of dollars, because I got the answers. I
                            understand culture. I am the nucleus. I think that’s a
                            responsibility that I have, to push possibilities, to
                            show people, this is the level that things could be at."
                        </p>
                        </TabPane>
                    </TabContent>
                    </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    </Container>
                    </div>
            </>
        );
}

export default ManageBlogPost;