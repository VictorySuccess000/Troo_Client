import React, { Fragment, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";
import axios from "axios";
import {
    notifysuccess,
    notifywarning,
    notifyerror,
} from "../components/notify";

const Send = () => {
    const [notexit, setNotexit] = useState("Cool");
    const checkUsername = (username) => {
        if (username == "") {
            setNotexit("Cool");
        } else {
            let formData = new FormData();
            formData.append("username", username);
            axios
                .post("http://localhost:4000/api/profile/checkusername", formData, {
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                    timeout: 20000,
                })
                .then(function (res) {
                    if (res.data == null) {
                        setNotexit("errorsign");
                    } else {
                        setNotexit("");
                        notifysuccess("Successfully Verified");
                    }
                });
        }
    }
    return (
        <Fragment>
            <Header />
            <Leftnav />
            <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-3">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center mb-3">
                                            <div className="col-8 col-sm-8 col-lg-8 col-md-8">
                                                <h1 className="font-xl fw-700">
                                                    Send to
                                                </h1>
                                            </div>
                                            <div className="col-4 col-sm-4 col-lg-4 col-md-4 text-right">
                                                <Link to="/wallet"><h5 className="cursor-pointer">Cancel</h5></Link>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text text-1">{notexit != "" ? <img className="cursor-pointer" src="../../assets/images/search-white.png" width={30} height={30} /> : <img className="cursor-pointer" src="../../assets/images/verified.png" width={30} height={30} />}</span>
                                            <input type="text" className="form-control main-input" placeholder="Search, public address (username)" aria-label="Search, public address (username)" aria-describedby="basic-addon2" onChange={(e) => checkUsername(e.target.value)} />
                                            <span className="input-group-text text-2"><img className="cursor-pointer" src="../../assets/images/qr-blue.svg" width={30} height={30} /></span>
                                        </div>
                                    </div>
                                    <div className={`error ${notexit}`} >Recipient username is invalid</div>
                                </div>
                            </div>

                            <div className="card w-100 border-0 bg-white shadow-xs p-0">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        {/* Please */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Popupchat />
            <Appfooter />
        </Fragment>
    );
};

export default Send;
