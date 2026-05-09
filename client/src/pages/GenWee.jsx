import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaMapMarkerAlt, FaCamera, FaTimes, FaStreetView } from 'react-icons/fa';
import { ExternalLink, Shirt } from 'lucide-react';

function GenWee() {
  const [location, setLocation] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [Ocassion, setOcassion] = useState('');
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState('male');
  const [userImage, setUserImage] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [tryOnImage, setTryOnImage] = useState(null);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [showTryOnModal, setShowTryOnModal] = useState(false);
  const debounceRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (location.trim().length < 2) {
      setLocationSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=5`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        setLocationSuggestions(data.map((item) => item.display_name));
        setShowSuggestions(true);
      } catch {
        setLocationSuggestions([]);
      }
    }, 350);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = {
        location,
        Ocassion,
        date: date.toISOString().split('T')[0],
        gender,
      };
      const response = await axios.post('http://localhost:4700/model', formData);
      const { weatherData, thumbnails } = response.data.payload;
      setWeather(weatherData);
      setOutfits(thumbnails);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async (outfit) => {
    if (!userImage) {
      alert('Please upload your image first');
      return;
    }
    setTryOnLoading(true);
    setShowTryOnModal(true);
    try {
      const response = await axios.post('http://localhost:4700/model/try-on', {
        model_image: userImage,
        cloth_image: outfit.thumbnail,
      });
      if (response.data.status === 'Success') {
        setTryOnImage(`data:image/jpeg;base64,${response.data.image}`);
      } else {
        throw new Error('Try-on failed');
      }
    } catch (err) {
      setError('Failed to process try-on. Please try again.');
    } finally {
      setTryOnLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f0eb 0%, #e8e2da 50%, #ddd7ce 100%)',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background texture circles */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(200,190,175,0.3)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '30%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'rgba(210,200,188,0.2)', pointerEvents: 'none',
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }

        .vac-input {
          width: 100%;
          padding: 13px 16px 13px 44px;
          border: 0.5px solid rgba(30,26,22,0.2);
          border-radius: 12px;
          background: rgba(255,255,255,0.65);
          color: #1e1a16;
          font-family: 'Georgia', serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          backdrop-filter: blur(8px);
        }
        .vac-input::placeholder { color: #a09585; }
        .vac-input:focus {
          border-color: rgba(30,26,22,0.5);
          box-shadow: 0 0 0 3px rgba(30,26,22,0.06);
        }

        .react-datepicker-wrapper { width: 100%; }
        .react-datepicker__input-container input {
          width: 100%;
          padding: 13px 16px 13px 44px;
          border: 0.5px solid rgba(30,26,22,0.2);
          border-radius: 12px;
          background: rgba(255,255,255,0.65);
          color: #1e1a16;
          font-family: 'Georgia', serif;
          font-size: 14px;
          outline: none;
          backdrop-filter: blur(8px);
        }

        .vac-label {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7a6f64;
          margin-bottom: 8px;
          display: block;
          font-family: 'Georgia', serif;
        }

        .vac-card {
          background: rgba(255,255,255,0.6);
          border: 0.5px solid rgba(255,255,255,0.9);
          border-radius: 20px;
          backdrop-filter: blur(16px);
          box-shadow: 0 8px 32px rgba(30,26,22,0.08);
        }

        .outfit-card {
          background: rgba(255,255,255,0.7);
          border: 0.5px solid rgba(30,26,22,0.1);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(30,26,22,0.08);
        }
        .outfit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(30,26,22,0.14);
        }

        .btn-primary {
          background: #1e1a16;
          color: #f5f0eb;
          border: none;
          border-radius: 12px;
          padding: 13px 24px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Georgia', serif;
          letter-spacing: 0.03em;
          transition: background 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 20px rgba(30,26,22,0.2);
        }
        .btn-primary:hover:not(:disabled) {
          background: #3a3530;
          transform: translateY(-1px);
        }
        .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

        .btn-outline {
          background: rgba(255,255,255,0.6);
          color: #1e1a16;
          border: 0.5px solid rgba(30,26,22,0.2);
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Georgia', serif;
          transition: background 0.2s ease;
          display: flex; align-items: center; gap: 6px; justify-content: center;
          width: 100%;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.9); }

        .gender-btn {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: 0.5px solid rgba(30,26,22,0.18);
          font-size: 14px;
          font-weight: 600;
          font-family: 'Georgia', serif;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .gender-btn.active {
          background: #1e1a16;
          color: #f5f0eb;
          border-color: #1e1a16;
          box-shadow: 0 4px 14px rgba(30,26,22,0.22);
        }
        .gender-btn.inactive {
          background: rgba(255,255,255,0.55);
          color: #5a5045;
        }
        .gender-btn.inactive:hover { background: rgba(255,255,255,0.85); }

        .icon-wrap {
          position: absolute;
          top: 50%; left: 14px;
          transform: translateY(-50%);
          color: #9a8f84;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

    

      {/* Try-On Modal */}
      {showTryOnModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
          zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f5f0eb 0%, #e8e2da 100%)',
            borderRadius: '24px',
            boxShadow: '0 32px 80px rgba(30,26,22,0.25)',
            maxWidth: '560px', width: '100%',
            border: '0.5px solid rgba(255,255,255,0.9)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <button
              onClick={() => { setShowTryOnModal(false); setTryOnImage(null); }}
              style={{
                position: 'absolute', right: '20px', top: '20px',
                background: 'rgba(30,26,22,0.08)', border: 'none',
                borderRadius: '50%', width: '36px', height: '36px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#1e1a16', fontSize: '16px',
              }}
            >
              <FaTimes />
            </button>
            <div style={{ padding: '36px' }}>
              <h3 style={{
                fontSize: '22px', fontWeight: '700', color: '#1e1a16',
                marginBottom: '24px', fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '-0.01em',
              }}>
                Virtual Try-On Result
              </h3>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {tryOnLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '360px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      border: '3px solid rgba(30,26,22,0.1)',
                      borderTopColor: '#1e1a16',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                ) : tryOnImage ? (
                  <img src={tryOnImage} alt="Try-on result" style={{
                    maxHeight: '360px', objectFit: 'contain',
                    borderRadius: '14px',
                    boxShadow: '0 8px 28px rgba(30,26,22,0.12)',
                    border: '0.5px solid rgba(30,26,22,0.1)',
                  }} />
                ) : (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: '360px', color: '#9a8f84', fontSize: '15px',
                    fontFamily: 'Georgia, serif',
                  }}>
                    Processing try-on…
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: '75vw', width: '75%', margin: '0 auto', padding: '48px 24px 80px', position: '100px', zIndex: 5 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '700',
            color: '#1e1a16', lineHeight: 1.1, letterSpacing: '-0.01em',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            margin: '0 0 12px',
          }}>
            Plan Your Perfect Outfit
          </h2>
          <p style={{ fontSize: '15px', color: '#7a6f64', fontFamily: 'Georgia, serif', margin: 0 }}>
            Tell us where you're going and we'll dress you for it.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="vac-card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Gender */}
            <div>
              <span className="vac-label">Gender</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['male', 'female'].map((g) => (
                  <button
                    key={g} type="button"
                    onClick={() => setGender(g)}
                    className={`gender-btn ${gender === g ? 'active' : 'inactive'}`}
                  >
                    {g === 'male' ? '👨 Male' : '👩 Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <span className="vac-label">Destination</span>
              <div style={{ position: 'relative' }} ref={suggestionsRef}>
                <span className="icon-wrap"><FaMapMarkerAlt size={14} /></span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => locationSuggestions.length > 0 && setShowSuggestions(true)}
                  placeholder="Enter your destination"
                  className="vac-input"
                  required
                  autoComplete="off"
                />
                {showSuggestions && locationSuggestions.length > 0 && (
                  <ul style={{
                    position: 'absolute', zIndex: 20, left: 0, right: 0, top: 'calc(100% + 6px)',
                    background: 'rgba(245,240,235,0.98)',
                    border: '0.5px solid rgba(30,26,22,0.12)',
                    borderRadius: '12px',
                    boxShadow: '0 12px 32px rgba(30,26,22,0.12)',
                    overflow: 'hidden', margin: 0, padding: 0, listStyle: 'none',
                    backdropFilter: 'blur(12px)',
                  }}>
                    {locationSuggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        onClick={() => { setLocation(suggestion); setShowSuggestions(false); }}
                        style={{
                          padding: '11px 16px',
                          fontSize: '13px',
                          color: '#3a3530',
                          cursor: 'pointer',
                          fontFamily: 'Georgia, serif',
                          borderBottom: i < locationSuggestions.length - 1 ? '0.5px solid rgba(30,26,22,0.08)' : 'none',
                          transition: 'background 0.15s',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(30,26,22,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        📍 {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <span className="vac-label">Occasion / Purpose</span>
              <div style={{ position: 'relative' }}>
                <span className="icon-wrap"><FaStreetView size={14} /></span>
                <input
                  type="text"
                  value={Ocassion}
                  onChange={(e) => setOcassion(e.target.value)}
                  placeholder="e.g. Beach holiday, Business trip, Hiking..."
                  className="vac-input"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <span className="vac-label">Travel Date</span>
              <div style={{ position: 'relative' }}>
                <span className="icon-wrap"><FaCalendar size={13} /></span>
                <DatePicker
                  selected={date}
                  onChange={(d) => setDate(d)}
                  className="vac-input"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <span className="vac-label">Your Photo (for Try-On)</span>
              <div style={{ position: 'relative' }}>
                <span className="icon-wrap"><FaCamera size={13} /></span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="vac-input"
                  style={{
                    paddingTop: '10px', paddingBottom: '10px',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* Image Preview */}
            {userImage && (
              <div>
                <span className="vac-label">Preview</span>
                <img
                  src={userImage}
                  alt="Uploaded"
                  style={{
                    width: '120px', height: '120px', objectFit: 'cover',
                    borderRadius: '14px',
                    border: '0.5px solid rgba(30,26,22,0.12)',
                    boxShadow: '0 4px 14px rgba(30,26,22,0.10)',
                  }}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                background: 'rgba(180,60,40,0.08)',
                border: '0.5px solid rgba(180,60,40,0.2)',
                borderRadius: '12px', padding: '14px 16px',
                color: '#7a2810', fontSize: '13px', fontFamily: 'Georgia, serif',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '4px' }}>
              {loading ? 'Generating…' : 'Generate Outfit Suggestions'}
            </button>
          </form>
        </div>

        {/* Weather Card */}
        {weather && (
          <div className="vac-card" style={{ padding: '28px', marginTop: '24px' }}>
            <h4 style={{
              fontSize: '18px', fontWeight: '700', color: '#1e1a16',
              fontFamily: "'Cormorant Garamond', serif",
              margin: '0 0 20px', letterSpacing: '-0.01em',
            }}>
              Weather in {location}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { label: 'Temperature', value: `${Math.round(weather.main.temp)}°C` },
                { label: 'Condition', value: weather.weather[0].main },
                { label: 'Humidity', value: `${weather.main.humidity}%` },
                { label: 'Wind Speed', value: `${weather.wind.speed} m/s` },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.5)',
                  border: '0.5px solid rgba(30,26,22,0.08)',
                  borderRadius: '12px', padding: '14px 16px',
                }}>
                  <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#9a8f84', fontFamily: 'Georgia, serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
                  <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1e1a16', fontFamily: "'Cormorant Garamond', serif" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outfits Grid */}
        {outfits.length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <h4 style={{
              fontSize: '26px', fontWeight: '700', color: '#1e1a16',
              fontFamily: "'Cormorant Garamond', serif",
              margin: '0 0 20px', letterSpacing: '-0.01em',
            }}>
              Recommended Outfits
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {outfits.map((outfit, index) => (
                <div key={index} className="outfit-card">
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={outfit.thumbnail}
                      alt={`Outfit ${index + 1}`}
                      style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => window.open(`https://www.amazon.com/dp/${outfit.asin}`, '_blank')}
                      className="btn-outline"
                    >
                      <ExternalLink size={14} /> View on Amazon
                    </button>
                    <button
                      onClick={() => handleTryOn(outfit)}
                      disabled={tryOnLoading}
                      className="btn-primary"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      <Shirt size={14} />
                      {tryOnLoading ? 'Processing…' : 'Try On'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default GenWee;