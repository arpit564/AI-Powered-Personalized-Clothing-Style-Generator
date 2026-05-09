import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, useUser, UserButton } from "@clerk/clerk-react";
import logo from "../assets/logo.png";

const avatars = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face",
];

const modelMain =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop&crop=top";
const modelThumb =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=180&h=220&fit=crop&crop=top";

export default function App() {
  const [animIn, setAnimIn] = useState(false);
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 80);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f0eb 0%, #e8e2da 50%, #ddd7ce 100%)",
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle background texture circles */}
      <div style={{
        position: "absolute", top: "-120px", right: "-80px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "rgba(200,190,175,0.3)", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: "-100px", left: "30%",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "rgba(210,200,188,0.2)", pointerEvents: "none"
      }} />

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 48px", position: "relative", zIndex: 10,
        opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <img
          src={logo}
          alt="GenWee"
          style={{ height: "45px", width: "auto", display: "block" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button style={{
                  background: "rgba(255,255,255,0.6)", border: "0.5px solid rgba(0,0,0,0.15)",
                  borderRadius: "10px", padding: "8px 20px", cursor: "pointer",
                  fontSize: "13px", color: "#3a3530", letterSpacing: "0.03em",
                  fontFamily: "Georgia, serif", fontWeight: "600",
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
                  background: "#1e1a16", color: "#f5f0eb", border: "none",
                  borderRadius: "10px", padding: "8px 20px", cursor: "pointer",
                  fontSize: "13px", letterSpacing: "0.03em",
                  fontFamily: "Georgia, serif", fontWeight: "600",
                  boxShadow: "0 4px 14px rgba(30,26,22,0.22)",
                  transition: "background 0.2s ease",
                }}
                  onMouseEnter={e => e.target.style.background = "#3a3530"}
                  onMouseLeave={e => e.target.style.background = "#1e1a16"}
                >
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "13px", color: "#5a5045", fontFamily: "Georgia, serif" }}>
                Hi, {user.firstName || user.username} 👋
              </span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      width: "36px", height: "36px",
                      border: "2px solid rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "40px 48px 60px", maxWidth: "1200px", margin: "0 auto",
        position: "relative", zIndex: 5,
      }}>
        {/* LEFT COPY */}
        <div style={{
          flex: "0 0 420px",
          opacity: animIn ? 1 : 0, transform: animIn ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
        }}>
          <h1 style={{
            fontSize: "clamp(38px, 5vw, 58px)", fontWeight: "700", lineHeight: "1.1",
            color: "#1e1a16", margin: "0 0 20px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: "-0.01em",
          }}>
            AI Powered Clothing Style Generator.
          </h1>

          <p style={{
            fontSize: "15px", color: "#7a6f64", lineHeight: "1.65",
            margin: "0 0 36px", fontFamily: "Georgia, serif",
            maxWidth: "340px",
          }}>
            Enter your fashion preferences, choose your style, and let AI generate the perfect wardrobe for your lifestyle.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link to="/GenWee" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#1e1a16", color: "#f5f0eb", border: "none",
                  borderRadius: "10px", padding: "14px 28px", fontSize: "14px",
                  fontWeight: "600", cursor: "pointer", letterSpacing: "0.03em",
                  fontFamily: "Georgia, serif",
                  transition: "background 0.2s ease, transform 0.15s ease",
                  boxShadow: "0 4px 20px rgba(30,26,22,0.25)",
                }}
                onMouseEnter={e => { e.target.style.background = "#3a3530"; e.target.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.target.style.background = "#1e1a16"; e.target.style.transform = "translateY(0)"; }}
              >
                Try Now
              </button>
            </Link>

            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              border: "1.5px solid rgba(30,26,22,0.25)", display: "flex",
              alignItems: "center", justifyContent: "center", color: "#7a6f64",
              fontSize: "16px",
            }}>←</div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          flex: "0 0 520px", position: "relative", height: "520px",
          opacity: animIn ? 1 : 0, transform: animIn ? "translateX(0)" : "translateX(24px)",
          transition: "opacity 0.65s ease 0.2s, transform 0.65s ease 0.2s",
        }}>
          {/* FUTURE PLAN BUTTON — replaces tabs */}
          <div style={{
            display: "flex", gap: "8px", marginBottom: "14px",
            justifyContent: "flex-end", alignItems: "center",
          }}>
            <button
              onClick={() => navigate("/future")}
              style={{
                padding: "7px 20px", borderRadius: "20px", fontSize: "12px",
                cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: "0.02em",
                background: "#1e1a16", color: "#f5f0eb", border: "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={e => e.target.style.background = "#3a3530"}
              onMouseLeave={e => e.target.style.background = "#1e1a16"}
            >
              Future Plan
            </button>
          </div>

          {/* MAIN CARD */}
          <div style={{
            position: "absolute", right: 0, top: "50px",
            width: "280px", height: "380px",
            borderRadius: "20px", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(30,26,22,0.18)",
          }}>
            <img
              src={modelMain}
              alt="Model in styled outfit"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", bottom: "16px", left: "50%",
              transform: "translateX(-50%)",
              background: "#1e1a16", color: "#f5f0eb",
              borderRadius: "20px", padding: "10px 20px",
              display: "flex", alignItems: "center", gap: "8px",
              whiteSpace: "nowrap", fontSize: "13px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}>
              <span>🔔</span>
              <span style={{ fontFamily: "Georgia, serif" }}>Style Now</span>
              <span>›</span>
            </div>
          </div>

          {/* THUMB CARD */}
          <div style={{
            position: "absolute", left: "30px", top: "80px",
            width: "160px", height: "220px",
            borderRadius: "16px", overflow: "hidden",
            boxShadow: "0 12px 40px rgba(30,26,22,0.15)",
            border: "3px solid rgba(255,255,255,0.85)",
          }}>
            <img
              src={modelThumb}
              alt="Thumbnail"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", bottom: "10px", left: "10px",
              background: "rgba(255,255,255,0.85)", borderRadius: "6px",
              padding: "4px 8px", fontSize: "11px", color: "#3a3530",
              fontFamily: "Georgia, serif",
            }}>
              ≡ View Options
            </div>
            <div style={{
              position: "absolute", top: "10px", right: "10px",
              width: "20px", height: "20px", borderRadius: "50%",
              background: "rgba(30,26,22,0.6)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "10px", cursor: "pointer",
            }}>×</div>
          </div>

          {/* UPLOAD CARD */}
          <div style={{
            position: "absolute", left: "10px", top: "320px",
            background: "rgba(255,255,255,0.82)", borderRadius: "14px",
            padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px",
            backdropFilter: "blur(12px)", boxShadow: "0 8px 28px rgba(30,26,22,0.10)",
            border: "0.5px solid rgba(255,255,255,0.9)", width: "200px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "#f0e8dc", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "16px",
            }}>📷</div>
            <div>
              <p style={{ margin: 0, fontSize: "12px", fontWeight: "600", color: "#1e1a16" }}>
                Upload Photo
              </p>
              <p style={{ margin: 0, fontSize: "11px", color: "#9a8f84" }}>
                Best for portrait shots
              </p>
            </div>
          </div>

          {/* SEARCH NEXT LABEL */}
          <div style={{
            position: "absolute", right: "0px", bottom: "30px",
            background: "rgba(255,255,255,0.75)", borderRadius: "20px",
            padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px",
            backdropFilter: "blur(10px)", border: "0.5px solid rgba(255,255,255,0.9)",
            fontSize: "12px", color: "#3a3530", fontFamily: "Georgia, serif",
          }}>
            <span>Style 1 now ready</span>
            <button style={{
              width: "24px", height: "24px", borderRadius: "50%",
              background: "#1e1a16", color: "#fff", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", cursor: "pointer",
            }}>›</button>
          </div>

          {/* BOTTOM AVATAR ROW */}
          <div style={{
            position: "absolute", right: "0px", bottom: "70px",
            display: "flex", gap: "8px",
          }}>
            {avatars.map((src, i) => (
              <div key={i} style={{
                width: "44px", height: "44px", borderRadius: "12px",
                overflow: "hidden", border: "2px solid rgba(255,255,255,0.9)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                cursor: "pointer", transition: "transform 0.2s ease",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        button:focus { outline: none; }
      `}</style>
    </div>
  );
}