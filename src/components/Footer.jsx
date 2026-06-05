import React, { useState } from "react";

const Footer = () => {

         const [hovered, setHovered] = useState("");

  // COMMON STYLE
 
  const linkStyle  = (name) => ({
  color: hovered === name ? "#2e8ca1" : "#3f4f5f",
    cursor: "pointer",
    transition: "0.3s",
    fontSize: "18px",
    marginBottom: "12px",
  });

  return (
    <>
      <div
        className="container-fluid"
          style={{
          backgroundColor: "#f1f1f1",
          padding: "40px 30px",
              marginTop: "40px",
        }}
      >

        {/* TOP FOOTER LINKS */}

        <div className="row">

          {/* COLUMN 1 */}

          <div  className="col-lg-3 col-md-6 mb-4">

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#3f4f5f",
                marginBottom: "25px",
              }}
            >
              Electronics on EMI
            </h3>

            <p
              style={linkStyle("smartphones")}
              onMouseEnter={() => setHovered("smartphones")}
              onMouseLeave={() => setHovered("")}
            >
              Smart Phones on EMI
            </p>

            <p
              style={linkStyle("headphones")}
              onMouseEnter={() => setHovered("headphones")}
              onMouseLeave={() => setHovered("")}
            >
              Headphones on EMI
            </p>

            <p
              style={linkStyle("watches")}
              onMouseEnter={() => setHovered("watches")}
              onMouseLeave={() => setHovered("")}
            >
              Smart Watches on EMI
            </p>

            <p
              style={linkStyle("speakers")}
              onMouseEnter={() => setHovered("speakers")}
              onMouseLeave={() => setHovered("")}
            >
              Speakers & Soundbars on EMI
            </p>

          </div>

          {/* COLUMN 2 */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#3f4f5f",
                marginBottom: "25px",
              }}
            >
              Kitchen & Home on EMI
            </h3>

            <p
              style={linkStyle("juicers")}
              onMouseEnter={() => setHovered("juicers")}
              onMouseLeave={() => setHovered("")}
            >
              Juicers, Mixers & Grinders on EMI
            </p>

            <p
              style={linkStyle("fans")}
              onMouseEnter={() => setHovered("fans")}
              onMouseLeave={() => setHovered("")}
            >
              Fans on EMI
            </p>

            <p
              style={linkStyle("cookware")}
              onMouseEnter={() => setHovered("cookware")}
              onMouseLeave={() => setHovered("")}
            >
              Cookware on EMI
            </p>

          </div>

          {/* COLUMN 3 */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#3f4f5f",
                marginBottom: "25px",
              }}
            >
              TV, AC & Appliances on EMI
            </h3>

            <p
              style={linkStyle("tv")}
              onMouseEnter={() => setHovered("tv")}
              onMouseLeave={() => setHovered("")}
            >
              Televisions on EMI
            </p>

            <p
              style={linkStyle("fridge")}
              onMouseEnter={() => setHovered("fridge")}
              onMouseLeave={() => setHovered("")}
            >
              Refrigerators on EMI
            </p>

            <p
              style={linkStyle("ac")}
              onMouseEnter={() => setHovered("ac")}
              onMouseLeave={() => setHovered("")}
            >
              Air Conditioners on EMI
            </p>

          </div>

          {/* COLUMN 4 */}

          <div className="col-lg-3 col-md-6 mb-4">

            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#3f4f5f",
                marginBottom: "25px",
              }}
            >
              Health & Wellness on EMI
            </h3>

            <p
              style={linkStyle("protein")}
              onMouseEnter={() => setHovered("protein")}
              onMouseLeave={() => setHovered("")}
            >
              Protein Supplements on EMI
            </p>

            <p
              style={linkStyle("health")}
              onMouseEnter={() => setHovered("health")}
              onMouseLeave={() => setHovered("")}
            >
              Health Supplements on EMI
            </p>

          </div>

        </div>

        {/* BOTTOM SECTION */}

        <div
          style={{
            borderTop: "1px solid #d4d4d4",
            paddingTop: "40px",
            marginTop: "20px",
          }}
        >

          <h2
            style={{
              color: "#2e8ca1",
              fontWeight: "700",
              marginBottom: "40px",
            }}
          >
            Snapmint for Business →
          </h2>

          <div className="row">

            {/* LOGO */}

            <div className="col-lg-4 col-md-6 mb-4">

              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: "700",
                  color: "#004851",
                }}
              >
                snap
                <span
                  style={{
                    color: "#63c7cf",
                    fontWeight: "500",
                  }}
                >
                  mint
                </span>
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#3f4f5f",
                  lineHeight: "35px",
                  marginTop: "20px",
                }}
              >
                Snapmint Credit Advisory Private Limited
                <br />
                Office No. 201, 2nd Floor, C-Wing
                <br />
                Mumbai - 400086
              </p>

            </div>

            {/* QUICK LINKS */}

            <div className="col-lg-2 col-md-6 mb-4">

              <h3
                style={{
                  fontWeight: "700",
                  marginBottom: "25px",
                  color: "#3f4f5f",
                }}
              >
                Quick Links
              </h3>

              <p
                style={linkStyle("about")}
                onMouseEnter={() => setHovered("about")}
                onMouseLeave={() => setHovered("")}
              >
                About Us
              </p>

              <p
                style={linkStyle("career")}
                onMouseEnter={() => setHovered("career")}
                onMouseLeave={() => setHovered("")}
              >
                Careers
              </p>

              <p
                style={linkStyle("faq")}
                onMouseEnter={() => setHovered("faq")}
                onMouseLeave={() => setHovered("")}
              >
                FAQ
              </p>

            </div>

            {/* SUPPORT LINKS */}

            <div  className="col-lg-3 col-md-6 mb-4">

              <h3
                style={{
                  fontWeight: "700",
                  marginBottom: "25px",
                  color: "#3f4f5f",
                }}
              >
                Support Links
              </h3>

              <p
                style={linkStyle("return")}
                onMouseEnter={() => setHovered("return")}
                onMouseLeave={() => setHovered("")}
              >
                Return Policy
              </p>

              <p
                style={linkStyle("contact")}
                onMouseEnter={() => setHovered("contact")}
                onMouseLeave={() => setHovered("")}
              >
                Contact Us
              </p>

              <p
                style={linkStyle("terms")}
                onMouseEnter={() => setHovered("terms")}
                onMouseLeave={() => setHovered("")}
              >
                Terms and Conditions
              </p>

            </div>

            {/* DOWNLOAD */}

            <div className="col-lg-3 col-md-6 mb-4">

              <h2
                style={{
                  fontWeight: "700",
                  color: "#3f4f5f",
                  marginBottom: "30px",
                }}
              >
            Download Snapmint Today
              </h2>

              <div className="d-flex gap-3 flex-wrap">

                <button
                  className="btn btn-dark"
                  style={{
                    borderRadius: "10px",
                    padding: "12px 20px",
                  }}
                >
                  Google Play
                </button>

                <button
                  className="btn btn-dark"
                  style={{
                    borderRadius: "10px",
                    padding: "12px 20px",
                  }}
                >
                  App Store
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;