import React from 'react'
import portfolioData from '../../data/portfolioData'
import { soundManager } from '../../utils/sounds'

export default function ProfessionalPortfolio({ onBackToGame }) {
  const handleBack = () => {
    soundManager.play('open')
    onBackToGame()
  }

  return (
    <div className="portfolio-scroll min-h-screen bg-[#14141e] text-white selection:bg-mc-green selection:text-black">
      {/* Top Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b-2 border-gray-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-mc-green flex items-center justify-center font-pixel text-xs text-black font-bold shadow-md">
            ⛏
          </div>
          <div>
            <h1 className="font-pixel text-xs sm:text-sm text-yellow-300">
              Kashif Ahmad
            </h1>
            <p className="text-[10px] text-gray-400 font-mono hidden sm:block">
              Computer Engineering Student | Developer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-gray-300" aria-label="Portfolio sections">
            <a href="#about" className="hover:text-yellow-300 transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-yellow-300 transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-yellow-300 transition-colors">
              Projects
            </a>
            <a href="#achievements" className="hover:text-yellow-300 transition-colors">
              Achievements
            </a>
            <a href="#education" className="hover:text-yellow-300 transition-colors">
              Education
            </a>
            <a href="#contact" className="hover:text-yellow-300 transition-colors">
              Contact
            </a>
            <a href="#goals" className="hover:text-yellow-300 transition-colors">
              Goals
            </a>
          </div>

          <button
            onClick={handleBack}
            aria-label="Return to the 3D world"
            className="mc-btn flex items-center gap-2 bg-mc-green hover:bg-green-600 text-black font-pixel text-xs px-3.5 py-2 rounded shadow-lg transition-transform hover:scale-105"
          >
            <span>🎮</span>
            <span>3D World</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* Hero Section */}
        <header className="text-center space-y-4 pt-4 pb-8 border-b border-gray-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-mc-green/20 border border-mc-green/40 rounded-full text-xs text-green-400 font-mono">
            <span>⚡</span>
            <span>AWS Student Builder Challenge • Portfolio</span>
          </div>

          <h2 className="font-pixel text-2xl sm:text-4xl text-white tracking-wide">
            Kashif Ahmad
          </h2>
          <p className="font-pixel text-xs sm:text-sm text-mc-green leading-relaxed">
            Computer Engineering Student • Developer • AI Enthusiast
          </p>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed pt-2">
            Welcome to my developer portfolio! Explore my projects, technical skill set,
            and learning journey in software development and artificial intelligence.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a
              href="#projects"
              className="mc-btn bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2.5 rounded font-pixel text-xs"
            >
              🚀 View Projects
            </a>
            <a
              href="#contact"
              className="mc-btn bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded font-pixel text-xs"
            >
              📫 Get In Touch
            </a>
          </div>
        </header>

        {/* About Me Section */}
        <section id="about" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 border-b-2 border-mc-green pb-2">
            <span className="text-2xl">{portfolioData.about.icon}</span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">
              {portfolioData.about.title}
            </h3>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">{portfolioData.about.description}</p>

          <div className="bg-[#1c1c28] p-6 rounded-lg border border-gray-800 space-y-4 shadow-xl">
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              {portfolioData.about.content.description}
            </p>

            <div className="pt-2">
              <h4 className="font-pixel text-xs text-yellow-300 mb-3">Key Focus Areas:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {portfolioData.about.content.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-black/40 p-3 rounded border-l-4 border-mc-green text-sm text-gray-200"
                  >
                    <span className="text-mc-green font-bold">✔</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 border-b-2 border-blue-500 pb-2">
            <span className="text-2xl">{portfolioData.skills.icon}</span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">
              {portfolioData.skills.title}
            </h3>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">{portfolioData.skills.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioData.skills.categories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-[#1c1c28] p-5 rounded-lg border border-gray-800 shadow-md space-y-3"
              >
                <h4 className="font-pixel text-xs text-blue-400">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 bg-gray-900 border border-gray-700 text-xs font-mono text-cyan-300 rounded shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 border-b-2 border-yellow-500 pb-2">
            <span className="text-2xl">{portfolioData.projects.icon}</span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">
              {portfolioData.projects.title}
            </h3>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">{portfolioData.projects.description}</p>

          <div className="grid grid-cols-1 gap-4">
            {portfolioData.projects.items.map((proj, idx) => (
              <div
                key={idx}
                className="bg-[#1c1c28] p-6 rounded-lg border border-gray-800 hover:border-yellow-400 transition-colors shadow-lg space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-pixel text-sm text-yellow-300">
                    {proj.name}
                  </h4>
                  <span className="text-[10px] font-mono bg-yellow-900/40 text-yellow-300 px-2.5 py-0.5 rounded border border-yellow-700">
                    Project #{idx + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-300 leading-relaxed"><strong className="text-gray-100">Overview:</strong> {proj.overview}</p>
                  <p className="text-sm text-gray-400 leading-relaxed"><strong className="text-gray-200">Problem addressed:</strong> {proj.problem}</p>
                  <div>
                    <h5 className="font-pixel text-[9px] text-green-300 mb-2">Main features</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                      {proj.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-black/60 text-xs text-gray-300 px-2.5 py-1 rounded border border-gray-700 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 border-b-2 border-purple-500 pb-2">
            <span className="text-2xl">{portfolioData.achievements.icon}</span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">
              {portfolioData.achievements.title}
            </h3>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">{portfolioData.achievements.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.achievements.items.map((ach, idx) => (
              <div
                key={idx}
                className="bg-[#1c1c28] p-5 rounded-lg border border-gray-800 shadow-md flex items-start gap-4 hover:border-purple-400 transition-colors"
              >
                <div className="text-3xl p-2 bg-black/40 rounded border border-gray-700">
                  {ach.badge}
                </div>
                <div className="space-y-1">
                  <h4 className="font-pixel text-xs text-yellow-300">
                    {ach.name}
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 border-b-2 border-emerald-500 pb-2">
            <span className="text-2xl">{portfolioData.education.icon}</span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">
              {portfolioData.education.title}
            </h3>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">{portfolioData.education.description}</p>

          <div className="bg-[#1c1c28] p-6 rounded-lg border border-gray-800 shadow-md space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-pixel text-sm text-yellow-300">
                {portfolioData.education.content.degree}
              </h4>
              <span className="bg-emerald-900/60 text-emerald-300 text-xs font-mono px-3 py-1 rounded border border-emerald-600">
                {portfolioData.education.content.status}
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {portfolioData.education.content.description}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">{portfolioData.education.content.institution}</p>
            <p className="text-xs text-gray-400">{portfolioData.education.content.department}</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 border-b-2 border-red-500 pb-2">
            <span className="text-2xl">{portfolioData.contact.icon}</span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">
              {portfolioData.contact.title}
            </h3>
          </div>

          <div className="bg-[#1c1c28] p-6 rounded-lg border border-gray-800 shadow-md space-y-6">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {portfolioData.contact.note}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
              <p><span className="text-gray-400">Name:</span> {portfolioData.contact.name}</p>
              <p><span className="text-gray-400">Location:</span> {portfolioData.contact.location}</p>
              <a className="hover:text-yellow-300" href={portfolioData.contact.links.email.url} aria-label={`Email ${portfolioData.contact.name}`}>
                Email: {portfolioData.contact.email}
              </a>
              <a className="hover:text-yellow-300" href={portfolioData.contact.links.phone.url} aria-label={`Call ${portfolioData.contact.name}`}>
                Phone: {portfolioData.contact.phone}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={portfolioData.contact.links.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white py-3.5 rounded text-xs font-pixel transition-transform hover:scale-105"
              >
                <span>💻</span>
                <span>GitHub Profile</span>
              </a>
              <a
                href={portfolioData.contact.links.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mc-btn flex items-center justify-center gap-3 bg-blue-800 hover:bg-blue-700 text-white py-3.5 rounded text-xs font-pixel transition-transform hover:scale-105"
              >
                <span>🔗</span>
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={portfolioData.contact.links.email.url}
                className="mc-btn flex items-center justify-center gap-3 bg-red-800 hover:bg-red-700 text-white py-3.5 rounded text-xs font-pixel transition-transform hover:scale-105"
              >
                <span>✉️</span>
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </section>

        {/* Career Goals Section */}
        <section id="goals" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 border-b-2 border-mc-green pb-2">
            <span className="text-2xl">{portfolioData.goals.icon}</span>
            <h3 className="font-pixel text-base sm:text-lg text-yellow-300">{portfolioData.goals.title}</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{portfolioData.goals.description}</p>
          <ol className="space-y-3">
            {portfolioData.goals.items.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-[#1c1c28] p-4 rounded border-l-4 border-mc-green text-sm text-gray-200">
                <span className="font-pixel text-emerald-400">{String(idx + 1).padStart(2, '0')}</span>
                <span>{goal}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-12 border-t border-gray-800 text-center space-y-2">
          <p className="font-pixel text-[10px] text-gray-400">
            Crafted with ⛏️ and Three.js by Kashif Ahmad
          </p>
          <p className="text-xs text-gray-500 font-mono">
            AWS Student Builder Challenge • Built for high performance & accessibility
          </p>
        </footer>
      </div>
    </div>
  )
}
