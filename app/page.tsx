'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const launchDate = new Date('2025-06-26T00:00:00Z').getTime();
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        color: '#222',
        textAlign: 'center',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '1.5rem', position: 'relative', width: '180px', height: '180px' }}>
        <Image
          src="/logo.png"
          alt="FreshBox Pro Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* Bigger and bolder welcome */}
      <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>
        Welcome to FreshBox Pro
      </h1>

      {/* Main tagline - bold */}
      <p style={{ fontSize: '1.5rem', fontWeight: '700', maxWidth: '600px', marginBottom: '0.5rem' }}>
        On-Demand Cleaning, Laundry & Dry Cleaning — Just a Tap Away
      </p>

      {/* Sub-tagline */}
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2rem', color: '#444' }}>
        Smart Contactless Service at Your Doorstep — <strong>Fresh. Fast. Secure. Convenient.</strong>
      </p>

      {/* Countdown */}
      {timeLeft ? (
        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Launching in: <br />
          <span style={{ color: '#0070f3' }}>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        </div>
      ) : (
        <h2 style={{ color: 'green' }}>We Are Live!</h2>
      )}

      {/* Email Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '12px 16px',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Notify Me
        </button>
        {submitted && (
          <p style={{ marginTop: '10px', color: 'green' }}>
            Thank you! You’ll be notified at launch.
          </p>
        )}
      </form>
    </div>
  );
}
