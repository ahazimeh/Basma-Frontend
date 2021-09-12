import React, { Component } from "react";
import "./Chart.scss";
import { Bar } from "react-chartjs-2";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { site_url } from "../../constants";
import { Redirect } from 'react-router';
class CustomerRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [],
        };
    }
    componentDidMount() {
        let token = window.localStorage.getItem("token");
        fetch(
            site_url + "/api/chart",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
            .then((res) => res.text())
            .then((res) => {
                console.log(res);
                if (JSON.parse(res).status != "Not authorized") {
                    this.setState({ values: JSON.parse(res) });
                }
                else {
                    window.localStorage.clear();
                }
            });
    }
    render() {
        if (window.localStorage.getItem("token") == undefined)
            return (<Redirect to="/" />)
        return (
            <>
                <AdminNavBar />
                <div style={{ padding: "0px 200px 200px 200px" }}>
                    <Bar
                        data={{
                            labels: ['Last Year', 'Last 3 Months', 'Last Month', 'Last Week', 'Last 24 Hours'],
                            datasets: [{
                                label: 'Average Customers Registered',
                                data: this.state.values,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }}
                    />
                </div>
            </>
        )
    }
}
export default CustomerRegister;