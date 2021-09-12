import React, { Component } from "react";
import "./CustomerRegister.scss";
import { Redirect } from 'react-router';
class CustomerRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            username: "",
            redirect: false
        };
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
        if (res.access_token) {
            window.localStorage.setItem("token", res.access_token);
            this.setState({ redirect: true });
        }
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
                                    <input placeholder="Name" type="text" class="input" name="name" onChange={this.handleInputChange} />
                                </div>
                            </div>
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
                            <input onClick={this.submitForm} type="submit" class="btn" value="Register" />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default CustomerRegister;