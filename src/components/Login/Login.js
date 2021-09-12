import React, { Component } from "react";
import "./Login.scss";
import { Redirect } from 'react-router';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            username: "",
            redirect: false
        };
    }
    addcl = () => {
        let parent = this.parentNode.parentNode;
        parent.classList.add("focus");
    }
    remcl = () => {
        let parent = this.parentNode.parentNode;
        if (this.value == "") {
            parent.classList.remove("focus");
        }
    }
    componentDidMount() {
        // const inputs = document.querySelectorAll(".input");
        // inputs.forEach(input => {
        //     input.addEventListener("focus", this.addcl);
        //     input.addEventListener("blur", this.remcl);
        // });
    }
    handleInputChange = (e) => {
        // console.log("a");
        // let file;
        // if (e.target.files) file = e.target.files[0];
        // console.log(file);
        this.setState({
            [e.target.name]: e.target.value,
        });
        // this.setState({
        //   image: file,
        // });
    };
    submitForm = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/login";
        const body = {
            email: this.state.username,
            password: this.state.password,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).catch(function (error) {
            console.log(error);
        });

        const res = await response.json();
        // const result = await response.status;
        if (res.access_token) {
            window.localStorage.setItem("token", res.access_token);
            this.setState({ redirect: true });
        }
        // if (result === 200) {
        //   console.log(res+'hi')
        //   var accessToken = res.access_token;
        //   var Admin = res.Admin;
        //   var userId = Admin.id;
        //   var s = JSON.stringify(userId);
        //   this.setState({ autho: result });
        //   window.localStorage.setItem("token", accessToken);
        //   window.localStorage.setItem("Admin", s);
        // } else {
        //   this.setState({ error: res.error });
        // }
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }
        return (
            <div className="login">
                <img class="wave" src="./wave.png" />
                <div class="container">
                    <div class="img">
                        <img src="./bg.svg" />
                    </div>
                    <div class="login-content">
                        <div className="form">
                            <img src="./avatar.svg" />
                            <h2 class="title">Welcome</h2>
                            <div class="input-div one">
                                <div class="i">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="div">
                                    {/* <h5>Username</h5> */}
                                    <input placeholder="Username" type="text" class="input" name="username" onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div class="input-div pass">
                                <div class="i">
                                    <i class="fas fa-lock"></i>
                                </div>
                                <div class="div">
                                    {/* <h5>Password</h5> */}
                                    <input type="password" placeholder="Password" class="input"
                                        name="password"
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <a href="#">Forgot Password?</a>
                            <input onClick={this.submitForm} type="submit" class="btn" value="Login" />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default Login;