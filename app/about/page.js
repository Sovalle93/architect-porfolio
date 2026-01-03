'use client'
import { motion } from 'framer-motion'
import { leagueGothic, abrilFatface } from '../fontprovider'

const workExperience = [
  {
    company: "Studio Arquitectura",
    year: "2020 - Presente",
    description: "Diseños Arquitectonicos"
  },
  {
    company: "Urbano",
    year: "2015 - 2020",
    description: "Diseños Arquitectonicos"
  },
  {
    company: "Arquitectura",
    year: "2012 - 2015",
    description: "Diseños Arquitectonicos"
  },
  {
    company: "Diseños",
    year: "2009 - 2012",
    description: "Diseños Arquitectonicos"
  }
]

export default function About() {
  return (
    <section className="py-24 px-8 bg-[#f6f6f2]  sm:px-16 lg:px-32 xl:px-48">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Photo & Intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Photo Placeholder */}
            <div 
              className="w-60 h-60 bg-[#8e7d6c] mb-6"
              style={{ 
                backgroundImage: `
                  linear-gradient(#00000010 1px, transparent 1px),
                  linear-gradient(90deg, #00000010 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px'
              }}
            />
            
            {/* Brief Intro */}
            <div>
              <h2 
                className="text-3xl text-gray-900 mb-4"
                style={leagueGothic.style}
              >
                Denisse Subercaseaux
              </h2>
              <p 
                className="text-gray-700 mb-4"
                style={leagueGothic.style}
              >
                Arquitecta
              </p>
              <p 
                className="text-gray-600"
                style={leagueGothic.style}
              >
                Descripcion profesional
              </p>
            </div>
          </motion.div>

          {/* Right Column - Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl text-gray-900 mb-8"
              style={leagueGothic.style}
            >
              Experiencia Profesional
            </h2>
            
            <div className="space-y-8">
              {workExperience.map((exp, index) => (
                <div key={index} className="pb-6 border-b border-gray-300 last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 
                      className="text-xl text-gray-900"
                      style={leagueGothic.style}
                    >
                      {exp.company}
                    </h3>
                    <p 
                      className="text-gray-600"
                      style={abrilFatface.style}
                    >
                      {exp.year}
                    </p>
                  </div>
                  <p 
                    className="text-gray-600"
                    style={leagueGothic.style}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}