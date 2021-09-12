import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Customer.scss";
let page = 1,
    rows = 0;
class Customer extends Component {
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
    componentDidMount() {
        let token = window.localStorage.getItem("token");
        this.state.token = token;
        fetch(
            "http://localhost:8000/api/customers/" +
            this.state.rows,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
            .then((res) => res.text())
            .then((res) => {
                //   if (JSON.parse(res).status == "Not authorized") {
                //     localStorage.removeItem("token");
                //     localStorage.removeItem("Admin");

                //     toast.error("Please Login Again!", {
                //       position: "top-right",
                //       autoClose: 2000,
                //       hideProgressBar: true,
                //       closeOnClick: true,
                //       onClose: () => window.location.replace("/admin/login"),
                //       pauseOnHover: true,
                //       draggable: true,
                //       progress: undefined,
                //     });
                //   } else 
                this.setState({ customers: JSON.parse(res).data });
                this.setState({ data: JSON.parse(res) });
            });











        let a = document.getElementsByClassName("pageOptions");
        a[0].style.display = "none";
        let a1 = document.getElementsByClassName("rowsOptions");
        a1[0].style.display = "none";
        let addClass = document.getElementsByClassName("page");
        addClass[0].classList.add("pageborder");
        let addClassRows = document.getElementsByClassName("rows");
        addClassRows[0].classList.add("rowsborder");



        var search1 = document.getElementById("search1");
        search1.addEventListener("input", (event) => {
            this.setState({ search1: search1.value });
            this.search();
        });

        var search2 = document.getElementById("search2");
        search2.addEventListener("input", (event) => {
            this.setState({ search2: search2.value });
            this.search();
        });

        var search3 = document.getElementById("search3");
        search3.addEventListener("input", (event) => {
            this.setState({ search3: search3.value });
            this.search();
        });

    }
    search() {
        fetch(
            "http://localhost:8000/api/customers/" +
            this.state.rows +
            "?page=1&id=" +
            this.state.search1 +
            "&name=" +
            this.state.search2 +
            "&email=" +
            this.state.search3,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + this.state.token,
                },
            }
        )
            .then((res) => res.text())
            .then((res) => {
                this.setState({ data: JSON.parse(res) })
                this.setState({ customers: JSON.parse(res).data })
            }
            );
    }
    pageOptions() {
        let a = document.getElementsByClassName("pageOptions");
        if (page == 0) {
            page = 1;
            a[0].style.display = "";
            let addClass = document.getElementsByClassName("page");
            addClass[0].classList.remove("pageborder");
        } else {
            page = 0;
            a[0].style.display = "none";
            let addClass = document.getElementsByClassName("page");
            addClass[0].classList.add("pageborder");
            // a[0].classList.remove("page1");
        }
    }
    page = (value) => {
        let a = document.getElementsByClassName("pageOptions");
        a[0].style.display = "none";
        page = 0;
        let pageOptions = document.getElementsByClassName("page");
        pageOptions[0].innerHTML = "Page " + value.k;
        let addClass = document.getElementsByClassName("page");
        addClass[0].classList.add("pageborder");
        fetch(
            "http://localhost:8000/api/customers/" +
            this.state.rows +
            "?page=" +
            value.k +
            "&id=" +
            this.state.search1 +
            "&name=" +
            this.state.search2 +
            "&email=" +
            this.state.search3,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + this.state.token,
                },
            }
        )
            .then((res) => res.text())
            .then((res) => {
                this.setState({ customers: JSON.parse(res).data })
                this.setState({ data: JSON.parse(res) })
            }
            );
    };
    rowsOptions() {
        let a = document.getElementsByClassName("rowsOptions");
        if (rows == 0) {
            rows = 1;
            a[0].style.display = "";
            let addClassRows = document.getElementsByClassName("rows");
            addClassRows[0].classList.remove("rowsborder");
        } else {
            rows = 0;
            a[0].style.display = "none";
            let addClassRows = document.getElementsByClassName("rows");
            addClassRows[0].classList.add("rowsborder");
        }
    }
    rows = (value) => () => {
        alert(value)
        this.state.rows = value;
        let a = document.getElementsByClassName("rowsOptions");
        a[0].style.display = "none";
        rows = 0;
        let rowsOptions = document.getElementsByClassName("rows");
        rowsOptions[0].innerHTML = "Rows " + value;
        let addClass = document.getElementsByClassName("rows");
        addClass[0].classList.add("rowsborder");



        fetch(
            "http://localhost:8000/api/customers/" +
            this.state.rows +
            "?page=1" +
            "&id=" +
            this.state.search1 +
            "&name=" +
            this.state.search2 +
            "&email=" +
            this.state.search3,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + this.state.token,
                },
            }
        )
            .then((res) => res.text())
            .then((res) => {
                this.setState({ customers: JSON.parse(res).data })
                this.setState({ data: JSON.parse(res) })
            }
            );
    };
    // page = (value) => () => {
    //     let a = document.getElementsByClassName("pageOptions");
    //     a[0].style.display = "none";
    //     page = 0;
    //     let pageOptions = document.getElementsByClassName("page");
    //     pageOptions[0].innerHTML = "Page " + value.k;
    //     let addClass = document.getElementsByClassName("page");
    //     addClass[0].classList.add("pageborder");
    // };
    last() {
        let l = document.getElementById("last").getAttribute("data");
        fetch(l + "&id=" + this.state.search1 +
            "&name=" +
            this.state.search2 +
            "&email=" +
            this.state.search3, {
            headers: {
                // Accept: "application/json",
                Authorization: "Bearer " + this.state.token,
            },
        })
            .then((res) => res.text())
            .then((res) => {
                this.setState({ data: JSON.parse(res) })
                this.setState({ customers: JSON.parse(res).data })
            }
            );
    }
    next() {
        let n = document.getElementById("next").getAttribute("data");
        fetch(n + "&id=" + this.state.search1 +
            "&name=" +
            this.state.search2 +
            "&email=" +
            this.state.search3, {
            headers: {
                // Accept: "application/json",
                Authorization: "Bearer " + this.state.token,
            },
        })
            .then((res) => res.text())
            .then((res) => {
                this.setState({ data: JSON.parse(res) })
                this.setState({ customers: JSON.parse(res).data })
            }
            );
    }
    render() {
        var x = [];
        // x.push(
        //     <div class="container">
        //         <div className="page page1">Page 1</div>
        //         {/* the size of this below is 3*number of pages + 10 */}
        //         <div className="pageOptions">
        //             {/* the size of this above is 3*number of pages + 10 */}
        //             <div>
        //                 <div onClick={this.page("1")}>Page 1</div>
        //                 <div onClick={this.page("2")}>Page 2</div>
        //                 <div onClick={this.page("3")}>Page 3</div>
        //             </div>
        //         </div>
        //     </div>
        // );
        let count;
        let has_prev = "";
        let has_next = "";
        if (this.state.data != undefined) {
            count = this.state.data.total;
            var last_page = this.state.data.prev_page_url;
            var next_page = this.state.data.next_page_url;
            var nbPages = this.state.data.last_page;
            var sizePage = 30 * nbPages + 10;
            if (last_page)
                has_prev = "cursor"
            if (next_page)
                has_next = "cursor";
            var pageList = [];
            var pageList1 = [];
            for (let i = 0; i < nbPages; i++) {
                let k = i + 1;
                pageList1.push(<div onClick={() => this.page({ k })}>Page {k}</div>);
            }

            pageList.push(<div>{pageList1}</div>);
        }
        return (
            // <div className="customer">
            //     <table class="content-table">
            //         <thead>

            //             <tr>
            //                 <th>id</th>
            //                 <th>name</th>
            //                 <th>email</th>
            //             </tr>
            //         </thead>
            //         <tbody>
            //             {this.state.customers.map((data, index) => {
            //                 return (
            //                     <tr>
            //                         <td>{data.id}</td>
            //                         <td>{data.name}</td>
            //                         <td>{data.email}</td>
            //                     </tr>
            //                 );

            //             })
            //             }
            //         </tbody>
            //     </table>
            // </div>
            <div className="App">
                {/* <input
                    aria-invalid="false"
                    placeholder="Search 42 records..."
                    type="text"
                    class="MuiInputBase-input MuiInput-input jss168"
                    value=""
                  /> */}
                <div className="table">
                    <div className="pn">
                        <input
                            id="last"
                            onClick={() => {
                                this.last();
                            }}
                            type="button"
                            className={"previous " + has_prev}
                            value="Previous"
                            data={last_page}
                        />
                        {/* input here */}
                        {/* <div id="userList">
                        <div>profile</div>
                        <div>profile</div>
                        <div>profile</div>
                      </div> */}
                        <div className="container">
                            <div onClick={this.pageOptions} className="page">
                                Page 1
                            </div>
                            {/* the size of this below is 3*number of pages + 10 */}
                            <div className="pageOptions">
                                {/* the size of this above is 3*number of pages + 10 */}
                                {pageList}
                            </div>
                        </div>

                        {/* input here */}
                        <div className="container">
                            <div onClick={this.rowsOptions} className="rows">
                                Rows 20
                            </div>
                            {/* the size of this below is 3*number of pages + 10 */}
                            <div className="rowsOptions">
                                {/* the size of this above is 3*number of pages + 10 */}
                                <div>
                                    <div onClick={this.rows("20")}>Row 20</div>
                                    <div onClick={this.rows("40")}>Row 40</div>
                                    <div onClick={this.rows("60")}>Row 60</div>
                                </div>
                            </div>
                        </div>
                        {/* <div>asdsad</div> */}
                        <input
                            id="next"
                            onClick={() => {
                                this.next();
                            }}
                            type="button"
                            className={"next " + has_next}
                            value="Next"
                            data={next_page}
                        />
                    </div>
                    <div>
                        <div className="row1">
                            <div className="col0 col3">Id</div>
                            <div className="col0 col3">Name</div>
                            <div className="col0 col3">Email</div>
                            <div className="col0 col3 hide">Office</div>
                            <div className="actionTitle col0 col3">Action</div>
                        </div>
                    </div>
                    <div className="row1">
                        <div className="col0 col3 search">
                            <input
                                id="search1"
                                aria-invalid="false"
                                placeholder={"Search " + count + " records..."}
                                type="text"
                                className="MuiInputBase-input MuiInput-input jss168"
                            />
                        </div>
                        <div className="col0 col3 search">
                            <input
                                id="search2"
                                aria-invalid="false"
                                placeholder={"Search " + count + " records..."}
                                type="text"
                                className="MuiInputBase-input MuiInput-input jss168"
                            />
                        </div>
                        <div className="col0 col3 search">
                            <input
                                id="search3"
                                aria-invalid="false"
                                placeholder={"Search " + count + " records..."}
                                type="text"
                                className="MuiInputBase-input MuiInput-input jss168"
                            />
                        </div>
                        <div className="col0 col3 search hide">
                            <input
                                aria-invalid="false"
                                placeholder="Search 42 records..."
                                type="text"
                                className="MuiInputBase-input MuiInput-input jss168"
                            />
                        </div>
                    </div>
                    {this.state.customers.map((data, index) => {
                        return (
                            <div className={"rowData " + "row" + index % 2}>
                                <div className="col0 col3">{data.id}</div>
                                <div className="col0 col3">{data.name}</div>
                                <div className="col0 col3">{data.email}</div>
                                <div className="col0 col3">
                                    <div className="action">
                                        <div>
                                            <FontAwesomeIcon className="blueHeart" icon={faHeart} />
                                        </div>
                                        <div>
                                            <FontAwesomeIcon className="redTrash" icon={faTrash} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                    }
                </div>
            </div>

        );
    }
}
// function Contact() {
//     return (
//         <div>Contact</div>
//     );
// }

export default Customer;
