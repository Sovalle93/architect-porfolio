'use client'
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { leagueGothic } from '../fontprovider.js';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const recaptchaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = recaptchaRef.current.getValue();
    if (!token) {
      setMessage('Por favor verifica que no eres un robot');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
      return;
    }

    setStatus('sending');
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      message: formData.get('message'),
      recaptchaToken: token,
    };

    try {
      // ✅ Send to your API route (server-side)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('¡Mensaje enviado con éxito!');
        e.target.reset();
        recaptchaRef.current.reset();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Error al enviar');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Hubo un error al enviar tu mensaje');
    }
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  // ✅ Use NEXT_PUBLIC_ for the site key (this is SAFE)
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <section className="min-h-screen bg-[#f6f6f2] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields (same as before) */}
          <div className="flex items-center gap-4">
            <label htmlFor="name" className="w-1/4 text-gray-800" style={leagueGothic.style}>
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-gray-900"
              style={{ backgroundColor: '#f6f6f2' }}
              placeholder="Tu nombre"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <label htmlFor="email" className="w-1/4 text-gray-800" style={leagueGothic.style}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-gray-900"
              style={{ backgroundColor: '#f6f6f2' }}
              placeholder="tu@email.com"
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="whatsapp" className="w-1/4 text-gray-800" style={leagueGothic.style}>
              WhatsApp:
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-gray-900"
              style={{ backgroundColor: '#f6f6f2' }}
              placeholder="+569..."
            />
          </div>
          
          <div className="flex items-center gap-4">
            <label htmlFor="message" className="w-1/4 text-gray-800" style={leagueGothic.style}>
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 text-gray-900"
              style={{ backgroundColor: '#f6f6f2' }}
              placeholder="Tu mensaje..."
            />
          </div>

          {/* reCAPTCHA - using public key only */}
          {recaptchaSiteKey && (
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={recaptchaSiteKey}
                theme="light"
              />
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-10 py-3 bg-[#585857] text-[#f6f6f2] rounded-md hover:bg-[#666666] disabled:opacity-70"
              style={leagueGothic.style}
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </div>
        </form>

        {/* Notification */}
        {showNotification && (
          <div className={`fixed top-6 right-6 p-4 rounded-md shadow-lg flex items-center space-x-2 z-50 ${
            status === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {status === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
            <span style={leagueGothic.style}>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
}