"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from 'react';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const useScrollAnimations = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

export default function Portfolio() {
  useScrollAnimations();

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-screen bg-[#0a0a12] overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e1e35_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />
        <main className="relative z-10 px-8">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-6">iOS Developer</p>
          <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            John Xavier
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto mb-10">
            Building elegant, high-performance iOS experiences with Swift &amp; SwiftUI.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <span className="px-3 py-1.5 rounded-full border border-[#1e1e35] text-slate-400 text-sm">
              📍 Kochi, Kerala
            </span>
            <a href="mailto:johnxavieroffice@gmail.com" className="px-3 py-1.5 rounded-full border border-[#1e1e35] text-slate-400 text-sm hover:border-violet-500/50 hover:text-violet-400 transition-colors">
              johnxavieroffice@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/johnxavierk/" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full border border-[#1e1e35] text-slate-400 text-sm hover:border-violet-500/50 hover:text-violet-400 transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/John-Xavier" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full border border-[#1e1e35] text-slate-400 text-sm hover:border-violet-500/50 hover:text-violet-400 transition-colors">
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors">
              View My Work
            </a>
            <a href="/Resume.pdf" download className="px-6 py-3 border border-[#1e1e35] hover:border-violet-500/50 text-slate-300 hover:text-violet-400 rounded-lg font-medium transition-colors">
              Download Resume
            </a>
            <Link href="/interview" className="px-6 py-3 border border-violet-500/40 hover:border-violet-500/70 bg-violet-500/5 hover:bg-violet-500/10 text-violet-300 rounded-lg font-medium transition-colors">
              iOS Interview Trainer →
            </Link>
          </div>
        </main>
      </section>

      {/* Featured: Wayspot */}
      <section className="py-24 bg-[#111120] scroll-animate">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Latest Launch</p>
            <h2 className="text-4xl font-bold text-slate-100">Now on the App Store</h2>
          </div>
          <div className="relative rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#0a0a12] to-[#111120] p-8 sm:p-12 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
            <div className="relative grid sm:grid-cols-[auto,1fr] gap-8 sm:gap-10 items-center">
              <div className="flex justify-center sm:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 blur-2xl opacity-30" />
                  <Image
                    src="/wayspot-icon.png"
                    alt="Wayspot app icon"
                    width={160}
                    height={160}
                    className="relative rounded-3xl ring-1 ring-violet-500/30"
                  />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-3">
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-100">Wayspot</h3>
                  <span className="px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-medium">Featured</span>
                </div>
                <p className="text-violet-400 text-sm mb-4">A quiet companion for spontaneous journeys.</p>
                <p className="text-slate-400 leading-relaxed mb-6">
                  My full-stack personal project — a SwiftUI iOS app backed by a Swift/Vapor server — built end to end and shipped to the App Store. Designed for curious explorers who&apos;d rather wander than plan.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  <a
                    href="https://apps.apple.com/in/app/wayspot/id6766961080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.43 2.21-1.13 3.01-.86.99-2.27 1.76-3.45 1.66-.15-1.13.4-2.27 1.1-3.01.78-.83 2.13-1.51 3.48-1.66ZM20.5 17.39c-.55 1.27-.81 1.84-1.51 2.97-.97 1.57-2.34 3.53-4.04 3.55-1.51.02-1.9-.98-3.95-.97-2.05.01-2.48.99-3.99.97-1.7-.02-3-1.79-3.97-3.36C.41 16.87-.18 11.4 2.55 8.5c1-1.07 2.4-1.69 3.78-1.69 1.6 0 2.6.88 3.92.88 1.28 0 2.06-.88 3.91-.88 1.31 0 2.7.71 3.69 1.94-3.24 1.78-2.71 6.36 1.65 8.64Z"/></svg>
                    Download on App Store
                  </a>
                  <a
                    href="https://wayspot.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1e1e35] hover:border-violet-500/50 text-slate-300 hover:text-violet-400 rounded-lg font-medium transition-colors"
                  >
                    Visit wayspot.in →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-[#0a0a12] scroll-animate">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 blur-3xl opacity-15" />
                <Image
                  src="/john.jpg"
                  alt="John Xavier"
                  width={280}
                  height={280}
                  className="relative rounded-full ring-4 ring-violet-500/20"
                />
              </div>
            </div>
            <div>
              <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">About Me</p>
              <h2 className="text-4xl font-bold text-slate-100 mb-6">Crafting iOS experiences</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                I&apos;m John Xavier, an iOS Developer with 4+ years of experience designing and delivering mobile apps across fintech, social media, healthcare, and real estate. Projects like ExtraHourz, a US-based gig discovery platform, and Centavizer, a marketplace I redesigned and shipped as sole developer, have been especially rewarding.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                I stay current through personal projects — most recently Wayspot, a full-stack travel companion now live on the App Store with a SwiftUI frontend and a Swift/Vapor backend, built end to end as proof of ownership across mobile and server-side development.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "4+", label: "Years Exp." },
                  { value: "10+", label: "Apps Shipped" },
                  { value: "MSc", label: "Distinction" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center p-4 rounded-xl border border-[#1e1e35] bg-[#111120]">
                    <p className="text-2xl font-bold text-violet-400">{value}</p>
                    <p className="text-xs text-slate-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <a href="/Resume.pdf" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-[#111120] scroll-animate">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Career</p>
            <h2 className="text-4xl font-bold text-slate-100">Experience</h2>
          </div>
          <div className="flex flex-col gap-5">
            {[
              {
                date: "Nov 2020 – Aug 2022",
                title: "iOS Developer",
                company: "Srishti Innovative, Trivandrum, India",
                description: [
                  "Built and shipped 5 iOS apps across fintech, social, healthcare, and booking domains for US and Indian clients.",
                  "Led a team of 4 developers; delivered all projects on schedule using Agile methodology and MVVM architecture.",
                  "Played a major role in hiring technical talent and introduced SwiftUI to new projects.",
                ],
              },
              {
                date: "Jun 2019 – Oct 2020",
                title: "iOS Developer",
                company: "Brokwill Technologies, Kochi, India",
                description: [
                  "Built Knatree (family tree app) and InvStars (real estate investment club for the Australian market).",
                  "Designed UI/UX, maintained code quality, and delivered both apps within deadlines.",
                ],
              },
              {
                date: "Oct 2017 – Jun 2019",
                title: "Web Developer",
                company: "Ezek Digital, Kochi, India",
                description: [
                  "Built responsive, cross-browser websites for clients using PHP and JavaScript.",
                  "Managed project delivery end to end — from requirement gathering to deployment.",
                ],
              },
              {
                date: "Mar 2017 – Sep 2017",
                title: "iOS Developer",
                company: "Mobtecnica Consultancy, Kochi, India",
                description: [
                  "Developed iOS applications using Objective-C for client projects.",
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-[#1e1e35] border-l-4 border-l-violet-500 bg-[#0a0a12] hover:bg-violet-500/5 transition-colors scroll-animate"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">{item.title}</h3>
                    <p className="text-violet-400 text-sm mt-0.5">{item.company}</p>
                  </div>
                  <span className="shrink-0 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                    {item.date}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex gap-2 text-slate-400 text-sm">
                      <span className="text-violet-400 shrink-0 mt-0.5">▹</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-24 bg-[#0a0a12] scroll-animate">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Background</p>
            <h2 className="text-4xl font-bold text-slate-100">Education</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                date: "2023",
                title: "MSc Software Engineering (Distinction)",
                company: "Staffordshire University, UK",
              },
              {
                date: "2015",
                title: "B.Tech Computer Science",
                company: "MG University, India",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-[#1e1e35] border-l-4 border-l-violet-500 bg-[#111120] scroll-animate"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                  {item.date}
                </span>
                <h3 className="text-lg font-semibold text-slate-100 mt-4 mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-[#111120] scroll-animate">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Work</p>
            <h2 className="text-4xl font-bold text-slate-100">Projects</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: "Wayspot",
                description: "Live on the App Store — my full-stack personal project for spontaneous explorers. SwiftUI iOS app paired with a Swift/Vapor backend, designed, built, and shipped end to end.",
                link: "https://apps.apple.com/in/app/wayspot/id6766961080",
                featured: true,
              },
              {
                name: "ExtraHourz",
                description: "US-based job portal for discovering nearby gigs. Integrated Firebase, Apple Maps, and Sign in with Apple/Google.",
                link: "https://apps.apple.com/in/app/flexhourz/id1618249870",
              },
              {
                name: "Centavizer",
                description: "Live on the App Store — marketplace with a redeemable coin system. Sole developer for the marketplace module, shopping basket, and Stripe payment integration; led a full UI redesign.",
                link: "https://centavizer.com",
              },
              {
                name: "EasyBooking",
                description: "Appointment booking platform for salons and spas with service selection and calendar management.",
                link: "https://apps.apple.com/in/app/easybooking/id1342670369",
              },
              {
                name: "Nikah in Kerala",
                description: "An app to simplify wedding planning in Kerala, offering a directory of services and venues.",
                link: "https://apps.apple.com/in/app/nikah-in-kerala-matrimony/id1222564842",
              },
              {
                name: "InvStars",
                description: "Real estate investment club platform for the Australian market — project listings, member enquiries, agent connections, and in-app chat.",
                link: "https://apps.apple.com/app/invstars",
              },
              {
                name: "Alerts Buddy",
                description: "An alerting application for custom notifications, helping users stay updated on their interests.",
                link: "https://apps.apple.com/app/alerts-buddy",
              },
              {
                name: "Maternia",
                description: "Pregnancy health tracking app with metric logging and guided tutorials for expecting mothers.",
                link: null,
              },
              {
                name: "TimeBox",
                description: "Social media app for close friends and family featuring VOIP calling, real-time messaging, and scheduled future message/media delivery.",
                link: null,
              },
              {
                name: "Knatree",
                description: "Family tree app with relationship mapping, a social news feed for relatives, and in-app chat supporting media and file sharing.",
                link: null,
              },
            ].map((project, index) => (
              <div
                key={index}
                className={`flex flex-col p-6 rounded-xl border bg-[#0a0a12] hover:shadow-2xl hover:shadow-violet-500/5 transition-all duration-300 scroll-animate ${
                  project.featured
                    ? "sm:col-span-2 border-violet-500/40 hover:border-violet-500/60"
                    : "border-[#1e1e35] hover:border-violet-500/40"
                }`}
                style={{ transitionDelay: `${(index % 2) * 80}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-slate-100">{project.name}</h3>
                  <div className="flex gap-2 shrink-0 ml-3">
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/40 text-violet-300 text-xs font-medium">Featured</span>
                    )}
                    {project.link ? (
                      <span className="px-2 py-0.5 rounded-full border border-violet-500/30 text-violet-400 text-xs font-medium">App Store</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full border border-slate-700 text-slate-500 text-xs font-medium">In Dev</span>
                    )}
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
                    View on App Store →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 bg-[#0a0a12] scroll-animate">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Technical</p>
            <h2 className="text-4xl font-bold text-slate-100">Skills & Technologies</h2>
          </div>
          <div className="flex flex-col gap-10">
            {[
              {
                category: "Frameworks & Tools",
                color: "text-violet-400",
                skills: ["Firebase", "Flutter", "Stripe", "Core Data", "REST APIs", "Apple Maps", "Google Maps", "Sign in with Apple/Google", "Xcode", "Git"],
              },
              {
                category: "Architecture & Practices",
                color: "text-cyan-400",
                skills: ["MVVM", "Agile/Scrum", "Team Leadership"],
              },
            ].map(({ category, color, skills }) => (
              <div key={category}>
                <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${color}`}>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 rounded-full border border-violet-500/20 bg-[#111120] text-slate-300 text-sm font-medium hover:border-violet-500/60 hover:text-violet-300 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a12] text-slate-400 py-12">
        <div className="max-w-4xl mx-auto px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent mb-10" />
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl font-bold text-slate-100">John Xavier</p>
            <p className="text-sm text-slate-500">iOS Developer · Kochi, Kerala</p>
            <a href="mailto:johnxavieroffice@gmail.com" className="text-violet-400 hover:text-violet-300 text-sm transition-colors">
              johnxavieroffice@gmail.com
            </a>
            <div className="flex gap-6 mt-1">
              <a href="https://www.linkedin.com/in/johnxavierk/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                LinkedIn
              </a>
              <a href="https://github.com/John-Xavier" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">
                GitHub
              </a>
            </div>
            <button onClick={scrollToTop} className="text-sm text-violet-400 hover:text-violet-300 transition-colors mt-2">
              Back to Top ↑
            </button>
            <p className="text-xs text-slate-600 mt-2">© {new Date().getFullYear()} John Xavier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
