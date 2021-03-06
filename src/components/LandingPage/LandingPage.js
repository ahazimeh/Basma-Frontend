import react, { Component } from "react";
import "./LandingPage.scss";
import { NavLink } from "react-router-dom";
import { site_url } from "../../constants";
class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            customers: [],
            rows: 20,
            search1: "",
            search2: "",
            search3: "",
            token: "",
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
        let token = window.localStorage.getItem("token");
        return (
            <div className="landing-page">
                <header>
                    <h2><NavLink to="/">Home</NavLink></h2>
                    <nav>
                        {token ? <li><NavLink to="/customers">Customers</NavLink></li> : ''}
                        {token ? <li><NavLink to="/chart">Bar Chart</NavLink></li> : ''}

                        {!token ? <li><NavLink to="/register">Register Customer</NavLink></li> : ''}

                        {!token ? <li><NavLink to="/login">Login</NavLink></li> : <li><NavLink onClick={() => this.LogOut()} to="#">Logout</NavLink></li>}
                    </nav>
                </header>
                <section class="hero">
                    <div class="background-image"></div>
                    <div class="hero-content-area">
                        <h1>Life is a party!</h1>
                        <h3>Unmissable Adventure Tours With Your Friends</h3>
                    </div>
                </section>
                <section class="destinations">
                    <h3 class="title">Some of our destinations:</h3>
                    <p>Tired of the beach alone? Are the plains too plain? Come along with us on one of our unusual adventures with yout friends. Here are some pictures from people who have had elevated experiences with us.</p>
                    <hr />

                    <ul class="grid">
                        <li class="small image-1"></li>
                        <li class="large image-2"></li>
                        <li class="large image-3"></li>
                        <li class="small image-4"></li>
                    </ul>
                </section>
                <section class="packages">
                    <h3 class="title">Tour Packages</h3>
                    <p>We offer a variety of group (minimum 5 people) packages. Whether you've spent some summers together or this might be your first adventure, we've got the perfect vacation for you.</p>
                    <hr />

                    <ul class="grid">
                        <li>
                            <i class="fa fa-compass fa-4x"></i>
                            <h4>Guided Trips</h4>
                            <p>Looking for the complete experience?Take a tour with one of our experts.They'll show you secrets that you're likely to miss otherwise.</p>
                        </li>
                        <li>
                            <i class="fa fa-camera-retro fa-4x"></i>
                            <h4>Photo Trips</h4>
                            <p>Want to experience nature's beauty without all of that annoying exercise? Take a photo tour on one of our <em>Life is a party!</em> buses.</p>
                        </li>
                        <li>
                            <i class="fa fa-bicycle fa-4x"></i>
                            <h4>Biking Trips</h4>
                            <p>If bicycles are more your speed, consider taking a tour through one of our mountain or city bike paths.We'll provide the bikes, and lunch too!</p>
                        </li>
                        <li>
                            <i class="fa fa-flag-checkered fa-4x"></i>
                            <h4>Racing Trips</h4>
                            <p>Got a competitive spirit?Sign up for one of our challenge-based marathons!Try to reach the summit before any other group.</p>
                        </li>
                    </ul>
                </section>
                <section class="testimonials">
                    <h3 class="title">Testimonials from our adventurers:</h3>
                    <hr />
                    <p class="quote">Wow! This tour made me realize how much I love being outside with my friends. After going on one of these tours, I can safely say that beer pong is my favorite game all time, also the cultural programs were really interesting!</p>
                    <p class="author">- Albert Herter</p>
                    <p class="quote">Wow, this really blew my mind. We had so much fun at the beach, and also some hidden secrets revealed. Come on, I'm living in this city for 5 years. Amazing!</p>
                    <p class="author">- Sharon Rosenberg</p>
                    <p class="quote">If you want to understand your friends better, head to the mountains. I mean, seriously. It's like sitting next to a campfire and just talk in the sunset, woah. You know? It's like that.</p>
                    <p class="author">- Luis Mendoza</p>
                </section>
                <footer>
                    <p>Images courtesy of <a href="http://unsplash.com/">unsplash</a>.</p>
                    <p>Why are you even reading this?! There's never anything interesting in the footer!</p>
                    <ul>
                        <li><a href="#"><i class="fa fa-twitter-square fa-2x"></i></a></li>
                        <li><a href="#"><i class="fa fa-facebook-square fa-2x"></i></a></li>
                        <li><a href="#"><i class="fa fa-snapchat-square fa-2x"></i></a></li>
                    </ul>
                </footer>
            </div>
        )
    }
}
export default LandingPage;