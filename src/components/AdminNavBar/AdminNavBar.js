import React, { Component } from "react";
import "./AdminNavBar.scss";
import { NavLink } from "react-router-dom";
import { site_url } from "../../constants";
import { Redirect } from 'react-router';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            username: "",
            redirect: false
        };
    }
    LogOut = async () => {
        let token = window.localStorage.getItem("token");
        const url = site_url + "/api/logout";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .catch(function (error) {
                console.log(error);
            });
        window.localStorage.clear();
        this.setState({ redirect: true });
    }
    render() {
        if (this.state.redirect == true)
            return (<Redirect to="/" />)
        return (
            <>
                <div className="NavBar">
                    <header>
                        <h2><h2><NavLink to="/">Home</NavLink></h2></h2>
                        <nav>
                            <li><NavLink to="/customers">Customers</NavLink></li>
                            <li><NavLink to="/chart">Bar Chart</NavLink></li>
                            <li><NavLink onClick={() => this.LogOut()} to="#">Logout</NavLink></li>
                        </nav>
                    </header>
                    <section class="hero">
                        <div class="background-image"></div>
                        {/* <div class="hero-content-area">
                        <h1>Life is a party!</h1>
                        <h3>Unmissable Adventure Tours With Your Friends</h3>
                        <a href="#" class="btn">Contact Us Now</a>
                    </div> */}
                    </section>
                </div>
            </>
        );
    }
}
export default NavBar;