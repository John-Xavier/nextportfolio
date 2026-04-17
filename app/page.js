"use client";
import Image from "next/image";
import { useEffect } from 'react';

// Scroll to top function for button in Footer
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Scroll animations with CSS class
const useScrollAnimations = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));
  }, []);
};

export default function Portfolio() {
  //useScrollAnimations();

  return (
    <>
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 p-8 text-center scroll-animate">
        <main>
          <h1 className="text-6xl font-bold text-gray-800 animate-fadeIn">John Xavier</h1>
          <p className="mt-4 text-2xl text-gray-600">iOS Developer</p>
          <p className="mt-2 text-lg text-gray-500">
            Kochi,Kerala | <a href="https://www.linkedin.com/in/johnxavierk/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a> | +91 9746794357 | <a href="https://github.com/John-Xavier" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>
          </p>
        </main>
      </section>

      {/* About Me Section */}
<section className="flex flex-col items-center justify-center py-16 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 scroll-animate">
  <Image
    src="/john.jpg"
    alt="John Xavier"
    width={150}
    height={150}
    className="rounded-full mb-6"
  />
  <h2 className="text-4xl font-semibold mb-4">About Me</h2>
  <p className="text-center max-w-2xl text-lg mb-6 leading-relaxed">
    I’m John Xavier, an iOS Developer with 4+ years of experience designing and delivering mobile apps across fintech, social media, healthcare, and real estate. Growing up in Kerala, India, I developed a fascination with coding and pursued it through a Bachelor’s in Computer Science and Engineering. I later completed my MSc in Software Engineering at Staffordshire University, UK.
  </p>
  <p className="text-center max-w-2xl text-lg mb-6 leading-relaxed">
    Throughout my career I’ve owned complete features end-to-end — from architecture decisions to App Store delivery. Projects like ExtraHourz, a US-based gig discovery platform, and Centavizer, a marketplace I redesigned and shipped sole-developer, have been especially rewarding. I’m proficient in Swift, SwiftUI, Firebase, and RESTful APIs.
  </p>
  <p className="text-center max-w-2xl text-lg mb-6 leading-relaxed">
    I stay current with mobile development through personal projects and continuous learning. My current focus is a full-stack Travel Destinations app — SwiftUI on the frontend paired with a Swift/Vapor backend — demonstrating end-to-end ownership across mobile and server-side development.
  </p>
  <p className="text-center max-w-2xl text-lg mb-6 leading-relaxed">
    Outside of work I’m a dedicated reader and traveler, drawn to science fiction, history, and astrophysics. Guided by a strong ethical foundation, attention to detail, and a collaborative spirit, I strive to create software that respects user privacy and enhances everyday experiences.
  </p>
  <div className="text-center text-gray-600 mt-4 mb-6 space-y-2">
    <p>🏆 MSc Software Engineering with Distinction</p>
    <p>📱 Multiple iOS Apps Shipped to the App Store</p>
    <p>⚡ Passionate about Mobile UX & Clean Code</p>
  </div>
 <a
  href="/resume.pdf"
  download
  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
>
  Download Resume
</a>
</section>




      <section className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 scroll-animate">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold">Experience</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          My professional journey and roles
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="border-l-4 border-blue-500 dark:border-blue-400">
          {/* Experience Item */}
          {[
            {
              date: "Nov 2020 – Aug 2022",
              title: "iOS Developer",
              company: "Srishti Innovative, Trivandrum, India",
              description: [
                "Built and shipped 5 iOS apps across fintech, social, healthcare, and booking domains for US and Indian clients.",
                "Led a team of 4 developers; delivered all projects on schedule using Agile methodology and MVVM architecture.",
                "Played a major role in hiring technical talent and introduced SwiftUI to new projects."
              ],
            },
            {
              date: "Jun 2019 – Oct 2020",
              title: "iOS Developer",
              company: "Brokwill Technologies, Kochi, India",
              description: [
                "Built Knatree (family tree app) and InvStars (real estate investment club for the Australian market).",
                "Designed UI/UX, maintained code quality, and delivered both apps within deadlines."
              ],
            },
            {
              date: "Oct 2017 – Jun 2019",
              title: "Web Developer",
              company: "Ezek Digital, Kochi, India",
              description: [
                "Built responsive, cross-browser websites for clients using PHP and JavaScript.",
                "Managed project delivery end to end — from requirement gathering to deployment."
              ],
            },
            {
              date: "Mar 2017 – Sep 2017",
              title: "iOS Developer",
              company: "Mobtecnica Consultancy, Kochi, India",
              description: [
                "Developed iOS applications using Objective-C for client projects."
              ],
            },
          ].map((item, index) => (
            <div key={index} className="mb-10 ml-8 scroll-animate">
              <div className="flex items-center mb-1">
                <p className="ml-4 text-gray-500 dark:text-gray-300">{item.date}</p>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-md text-gray-600 dark:text-gray-400 mb-2">{item.company}</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Education Section */}
      <section className="py-16 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 scroll-animate">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold">Education</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Academic background
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-blue-500 dark:border-blue-400">
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
              <div key={index} className="mb-10 ml-8 scroll-animate">
                <div className="flex items-center mb-1">
                  <p className="ml-4 text-gray-500 dark:text-gray-300">{item.date}</p>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-md text-gray-600 dark:text-gray-400">{item.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 scroll-animate">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold">Projects</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          A showcase of my recent work
        </p>
      </div>
      
      <div className="flex flex-col gap-8 items-center sm:flex-row sm:flex-wrap sm:justify-center">
        {/* Project Cards */}
        {[
          {
            name: "ExtraHourz",
            description: "US-based job portal for discovering nearby gigs. Integrated Firebase, Apple Maps, and Sign in with Apple/Google.",
            link: "https://apps.apple.com/in/app/flexhourz/id1618249870",
            linkLabel: "View on App Store"
          },
          {
            name: "Centavizer",
            description: "Live on the App Store — marketplace with a redeemable coin system. Sole developer for the marketplace module, shopping basket, and Stripe payment integration; led a full UI redesign.",
            link: "https://centavizer.com",
            linkLabel: "View on App Store"
          },
          {
            name: "EasyBooking",
            description: "Appointment booking platform for salons and spas with service selection and calendar management.",
            link: "https://apps.apple.com/in/app/easybooking/id1342670369",
            linkLabel: "View on App Store"
          },
          {
            name: "Nikah in Kerala",
            description: "An app to simplify wedding planning in Kerala, offering a directory of services and venues.",
            link: "https://apps.apple.com/in/app/nikah-in-kerala-matrimony/id1222564842",
            linkLabel: "View on App Store"
          },
          {
            name: "InvStars",
            description: "Real estate investment club platform for the Australian market — project listings, member enquiries, agent connections, and in-app chat.",
            link: "https://apps.apple.com/app/invstars",
            linkLabel: "View on App Store"
          },
          {
            name: "Alerts Buddy",
            description: "An alerting application for custom notifications, helping users stay updated on their interests.",
            link: "https://apps.apple.com/app/alerts-buddy",
            linkLabel: "View on App Store"
          },
          {
            name: "Maternia",
            description: "Pregnancy health tracking app with metric logging and guided tutorials for expecting mothers.",
            link: null,
            linkLabel: null
          },
          {
            name: "TimeBox",
            description: "Social media app for close friends and family featuring VOIP calling, real-time messaging, and scheduled future message/media delivery.",
            link: null,
            linkLabel: null
          },
          {
            name: "Knatree",
            description: "Family tree app with relationship mapping, a social news feed for relatives, and in-app chat supporting media and file sharing.",
            link: null,
            linkLabel: null
          },
          {
            name: "Travel Destinations App",
            description: "Personal project (in progress) — full-stack iOS app with a SwiftUI frontend and a Swift backend built with Vapor and Fluent, demonstrating end-to-end ownership across mobile and server-side development.",
            link: null,
            linkLabel: null
          }
        ].map((project, index) => (
          <div key={index} className="max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {project.linkLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>

    <section className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 scroll-animate">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold">Skills & Technologies</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Technologies I work with
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-10">
        {[
          {
            category: "Frameworks & Tools",
            color: "text-emerald-500 dark:text-emerald-400",
            skills: ["Firebase", "Flutter", "Stripe", "Core Data", "REST APIs", "Apple Maps", "Google Maps", "Sign in with Apple/Google", "Xcode", "Git"],
          },
          {
            category: "Architecture & Practices",
            color: "text-purple-500 dark:text-purple-400",
            skills: ["MVVM", "Agile/Scrum", "Team Leadership"],
          },
        ].map(({ category, color, skills }) => (
          <div key={category}>
            <h3 className={`text-lg font-semibold mb-3 ${color}`}>{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* Footer Section */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-2">John Xavier</p>
          <p className="text-sm mb-4">Kochi, Kerala</p>
          <a
            href="mailto:johnxavieroffice@gmail.com"
            className="text-blue-500 hover:underline mb-4"
          >
            johnxavieroffice@gmail.com
          </a>

          <div className="flex gap-6 mb-4">
            <a href="https://www.linkedin.com/in/johnxavierk/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              LinkedIn
            </a>
            <a href="https://github.com/John-Xavier" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              GitHub
            </a>
          </div>

          <button onClick={scrollToTop} className="text-sm text-blue-500 hover:underline">
            Back to Top
          </button>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
            © {new Date().getFullYear()} John Xavier. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
