import React from 'react';
import Header from 'components/Header/Header';
import AboutUs from 'components/AboutUs/AboutUs';

const HomePage = () =>  {

    React.useEffect(() => {
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
        });
        return (
        <div>
            <Header />
            <AboutUs />
        </div>
        );
    }

export default HomePage;