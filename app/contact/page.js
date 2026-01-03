'use client'
import { useState, useEffect } from 'react';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { leagueGothic } from '../fontprovider.js';

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  // Auto-hide notifications after 5 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setShowNotification(false);
    
    try {
      const formData = new FormData(e.target);
      const response = await fetch('https://formspree.io/f/mzzrvejj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      
      // Formspree's actual success condition
      if (response.ok && data.ok) {
        setStatus('success');
        setMessage('¡Mensaje enviado con éxito!');
        e.target.reset();
      } else {
        // Handle Formspree validation errors
        if (data.errors) {
          const errorMsg = data.errors.map(err => err.message).join('. ');
          throw new Error(errorMsg);
        }
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
    } finally {
      setShowNotification(true);
    }
  };

  return (
    <section className="min-h-screen bg-[#f6f6f2] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain exactly as in your original code */}
          <div className="flex items-center gap-4">
            <label 
              htmlFor="message" 
              className="w-1/4 font-league text-gray-800"
              style={leagueGothic.style}
            >
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#585857]"
              rows={5}
              placeholder="Tu mensaje..."
              style={{ backgroundColor: '#f6f6f2', color: '#666666' }}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <label 
              htmlFor="name" 
              className="w-1/4 font-league text-gray-800"
              style={leagueGothic.style}
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#585857]"
              placeholder="Tu nombre"
              style={{ backgroundColor: '#f6f6f2', color: '#666666' }}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <label 
              htmlFor="email" 
              className="w-1/4 font-league text-gray-800"
              style={leagueGothic.style}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#585857]"
              placeholder="Tu email@example.com"
              style={{ backgroundColor: '#f6f6f2', color: '#666666' }}
            />
          </div>

          <div className="flex items-center gap-4">
            <label 
              htmlFor="whatsapp" 
              className="w-1/4 font-league text-gray-800"
              style={leagueGothic.style}
            >
              WhatsApp:
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#585857]"
              placeholder="+569..."
              style={{ backgroundColor: '#f6f6f2', color: '#666666' }}
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-10 py-3 bg-[#585857] text-[#f6f6f2] rounded-md hover:bg-[#666666] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              style={leagueGothic.style}
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </div>
        </form>

        {/* Notification with fixed positioning and z-index */}
        {showNotification && (
          <div className={`fixed top-6 right-6 p-4 rounded-md shadow-lg flex items-center space-x-2 z-50 ${
            status === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white animate-fade-in`}>
            {status === 'success' ? (
              <FaCheck className="text-xl" />
            ) : (
              <FaExclamationTriangle className="text-xl" />
            )}
            <span style={leagueGothic.style}>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
}