import React from "react";

import { 
    FaSearch,
    FaRegUserCircle,
    FaBars,
}   from "react-icons/fa";

import { HiOutlineBriefcase } from "react-icons/hi";
import { PiCubeLight } from "react-icons/pi";

const Header = () => {
 
    

    return (
        <>
            {/* TOP HEADER */}

            <div
                className="container-fluid"
                style={{   backgroundColor: "#eef8fa", padding: "15px 30px",}} >
                <div className="row align-items-center">

                    {/* LOGO */}

                    <div className="col-lg-2">
                        <h1
                            style={{ fontSize: "42px", fontWeight: "700",color: "#004851",margin: "0",}}>
                            snap
                            <span
                                style={{color: "#63c7cf",fontWeight: "500",}}>
                                mint
                            </span>
                        </h1>
                    </div>

                    {/* SEARCH BAR */}

                    <div className="col-lg-5">
                        <div className="position-relative">

                            <input
                                type="text"
                                placeholder="Search for TV, Mobiles, Headphones & more"
                                className="form-control"
                                style={{height: "52px",borderRadius: "12px",paddingRight: "50px",}}/>

                            <FaSearch
                                style={{position: "absolute",right: "20px",top: "18px",fontSize: "18px",color: "#004851",   cursor: "pointer",}}
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE MENU */}

                    <div className="col-lg-5">
                        <div className="d-flex justify-content-end align-items-center gap-4">

                            {/* FOR BUSINESS */}

                            <div className="d-flex align-items-center gap-2">
                                <HiOutlineBriefcase
                                    style={{fontSize: "24px",color: "#63c7cf",}}/>

                                <span
                                    style={{fontSize: "18px",color: "#004851",fontWeight: "500",}}>
                                    For Business
                                </span>
                            </div>

                            {/* PAY EMI */}

                            <div className="d-flex align-items-center gap-2">
                                <PiCubeLight
                                    style={{fontSize: "24px",color: "#63c7cf",}}
                                />

                                <span
                                    style={{fontSize: "18px",color: "#004851",fontWeight: "500",}}
                                >
                                    Pay EMI
                                </span>
                            </div>

                            {/* SIGN UP */}

                            <div className="d-flex align-items-center gap-2">
                                <FaRegUserCircle
                                    style={{fontSize: "24px",color: "#63c7cf",}}/>

                                <span
                                    style={{fontSize: "18px",color: "#004851",fontWeight: "500", }}>
                                    Sign-up
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM NAVBAR */}

            <div
                className="container-fluid"
                style={{borderBottom: "1px solid #ddd",padding: "12px 30px",backgroundColor: "white",}}
            >
                <div className="d-flex justify-content-between align-items-center">

                    {/* LEFT MENU */}

                    <div className="d-flex align-items-center gap-5">

                        <FaBars
                            style={{fontSize: "26px",cursor: "pointer", color: "#004851",}}
                        />

                        <span style={{ fontWeight: "500" }}>Beauty</span>

                        <span style={{ fontWeight: "500" }}>Groceries</span>

                        <span style={{ fontWeight: "500" }}>
                              Mens-shirts
                        </span>

                        <span style={{ fontWeight: "500" }}>
                        Smartphones
                        </span>

                            <span style={{ fontWeight: "500" }}>
                             womens-jewellery                     
                        </span>

                        <span style={{ fontWeight: "500" }}>Fashion</span>

                        <span style={{ fontWeight: "500" }}>
                                 Skin-care

                        </span>

                        <span style={{ fontWeight: "500" }}>
                            Sports-accessories
                        </span>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Header;