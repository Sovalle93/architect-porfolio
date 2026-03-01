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
    console.log('1. Form submitted');
    
    // Get reCAPTCHA token
    console.log('2. Getting reCAPTCHA token...');
    const token = recaptchaRef.current.getValue();
    console.log('3. Token received:', token ? 'YES' : 'NO');
    
    if (!token) {
      console.log('4. No token - showing error');
      setMessage('Por favor verifica que no eres un robot');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
      return;
    }

    setStatus('sending');
    console.log('5. Status set to sending');
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      whatsapp: formData.get('whatsapp'),
      message: formData.get('message'),
      recaptchaToken: token,
    };
    console.log('6. Data prepared:', { ...data, recaptchaToken: 'HIDDEN' });

    try {
      console.log('7. Sending fetch to /api/send-email...');
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      console.log('8. Response status:', response.status);
      
      const result = await response.json();
      console.log('9. Response data:', result);

      if (response.ok) {
        console.log('10. Success!');
        setStatus('success');
        setMessage('¡Mensaje enviado con éxito!');
        e.target.reset();
        recaptchaRef.current.reset();
      } else {
        console.log('10. Error from server:', result);
        throw new Error(result.error || 'Error al enviar');
      }
    } catch (error) {
      console.log('11. Catch error:', error.message);
      setStatus('error');
      setMessage(error.message || 'Hubo un error al enviar tu mensaje');
    }
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <section className="min-h-screen bg-[#f6f6f2] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              theme="light"
            />
          </div>
          
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