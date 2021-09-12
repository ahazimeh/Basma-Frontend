import React, { Component } from "react";
import "./NavBar.scss";

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
        const url = "http://localhost:8000/api/logout";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <>
                <div class="topnav">
                    <a class="active" href="#home">Home</a>
                    <a href="#news">News</a>
                    <a href="#contact">Contact</a>
                    <a style={{ float: "right" }} onClick={this.LogOut} href="#about">About</a>
                </div>

                <div style={{ paddingLeft: "16px" }}>
                    <h2>Top Navigation Example</h2>
                    <p>Some content..</p>
                </div>
            </>
        );
    }
}
export default NavBar;