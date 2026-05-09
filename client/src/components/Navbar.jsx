import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = {
    fontSize: "13px",
    color: "#5a5045",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.03em",
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 48px",
      position: "relative",
      zIndex: 10,
    }}>
      {/* Logo */}
       


<Link to="/">
  <img
    src={logo}
    alt="GenWee Logo"
    style={{
      height: "40px",
      width: "auto",
      display: "block",
    }}
  />
</Link>

      {/* Desktop Nav Links */}
      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}
        className="nav-links-desktop">
        {["Home", "About", "Services", "Contact"].map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            style={linkStyle}
            onMouseEnter={e => e.target.style.color = "#1e1a16"}
            onMouseLeave={e => e.target.style.color = "#5a5045"}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <SignedOut>
          <SignInButton mode="modal">
            <button style={{
              background: "rgba(255,255,255,0.6)",
              border: "0.5px solid rgba(0,0,0,0.15)",
              borderRadius: "10px",
              padding: "8px 20px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#3a3530",
              letterSpacing: "0.03em",
              fontFamily: "Georgia, serif",
              fontWeight: "600",
              transition: "background 0.2s ease",
            }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.9)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.6)"}
            >
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button style={{
              background: "#1e1a16",
              color: "#f5f0eb",
              border: "none",
              borderRadius: "10px",
              padding: "8px 20px",
              cursor: "pointer",
              fontSize: "13px",
              letterSpacing: "0.03em",
              fontFamily: "Georgia, serif",
              fontWeight: "600",
              boxShadow: "0 4px 14px rgba(30,26,22,0.22)",
              transition: "background 0.2s ease",
            }}
              onMouseEnter={e => e.target.style.background = "#3a3530"}
              onMouseLeave={e => e.target.style.background = "#1e1a16"}
            >
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <span style={{
            fontSize: "13px",
            color: "#5a5045",
            fontFamily: "Georgia, serif",
          }}>
            Hi, {user?.firstName || user?.username} 👋
          </span>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "36px",
                  height: "36px",
                  border: "2px solid rgba(255,255,255,0.8)",
                  borderRadius: "50%",
                },
              },
            }}
          />
        </SignedIn>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "rgba(255,255,255,0.6)",
            border: "0.5px solid rgba(0,0,0,0.12)",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            fontSize: "16px",
            color: "#5a5045",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="nav-hamburger"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "rgba(245,240,235,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "0.5px solid rgba(30,26,22,0.1)",
          padding: "20px 48px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 20,
          boxShadow: "0 8px 24px rgba(30,26,22,0.08)",
        }}>
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              style={{ ...linkStyle, fontSize: "15px" }}
            >
              {item}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "10px", paddingTop: "8px" }}>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "0.5px solid rgba(0,0,0,0.15)",
                  borderRadius: "10px", padding: "8px 20px",
                  cursor: "pointer", fontSize: "13px", color: "#3a3530",
                  fontFamily: "Georgia, serif", fontWeight: "600",
                }}>Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button style={{
                  background: "#1e1a16", color: "#f5f0eb",
                  border: "none", borderRadius: "10px", padding: "8px 20px",
                  cursor: "pointer", fontSize: "13px",
                  fontFamily: "Georgia, serif", fontWeight: "600",
                }}>Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: { width: "36px", height: "36px" } } }} />
            </SignedIn>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;