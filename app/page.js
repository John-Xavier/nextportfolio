"use client";
import Image from "next/image";
import { FaSwift, FaGithub, FaGit } from 'react-icons/fa';
import { FaFlutter } from 'react-icons/fa6';
import { SiXcode, SiJavascript, SiReact, SiFirebase, SiPhp, SiDart } from 'react-icons/si';
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
          <p className="mt-4 text-2xl text-gray-600">iOS Engineer</p>
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
    I’m John Xavier, an iOS Developer and Software Engineer with a passion for coding and creating impactful, user-centered applications. Growing up in Kerala, India, I developed a fascination with coding and pursued it through a Bachelor’s in Computer Science and Engineering. In 2022, I moved to the UK to complete my Master’s in Software Engineering, graduating with distinction.
  </p>
  <p className="text-center max-w-2xl text-lg mb-6 leading-relaxed">
    Throughout my journey, I’ve overcome challenges through perseverance and dedication, constantly improving my skills in problem-solving and software refinement. As a developer, I’m committed to designing simple, intuitive interfaces that enhance user experiences. My projects like ExtraHourz and EasyBooking have been especially fulfilling—ExtraHourz for its practical impact on job-seekers, and EasyBooking for its sleek, user-friendly design.
  </p>
  <p className="text-center max-w-2xl text-lg mb-6 leading-relaxed">
    I stay updated on the latest in mobile development by learning continuously through tech events, tutorials, and personal projects. I’m particularly excited about the potential of AI in app development and look forward to incorporating it into future projects, with a long-term goal of taking on a senior management role in a tech company.
  </p>
  <p className="text-center max-w-2xl text-lg mb-6 leading-relaxed">
    Outside of work, I’m a dedicated reader and traveler, fascinated by science fiction, history, and astrophysics. My interests drive my curiosity and keep me engaged with the latest discoveries in tech and beyond. Guided by a strong ethical foundation, attention to detail, and a collaborative spirit, I strive to create software that respects user privacy and enhances everyday experiences.
  </p>
  <div className="text-center text-gray-600 mt-4 mb-6 space-y-2">
    <p>🏆 Completed MSc with Distinction</p>
    <p>📱 10+ Apps Published</p>
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
              date: "Sep 2022 - Oct 2023",
              title: "MSc Computer Science (Software Engineering)",
              company: "Staffordshire University, UK",
              description: [
                "Completed with distinction.",
                "Scored over 80% in assignments, learning several new programming languages.",
                "Developed software to improve code quality in Java using deep learning methods as part of dissertation."
              ],
            },
            {
              date: "Nov 2020 – Sep 2022",
              title: "iOS Developer",
              company: "Srishti Innovative, Trivandrum, India",
              description: [
                "Key contributor in mobile app development and discussions.",
                "Lead developer in 6 iOS projects, managed client app store accounts, and published apps.",
                "Played a major role in hiring technical talent and introduced SwiftUI to new projects."
              ],
            },
            {
              date: "Jun 2019 – Oct 2020",
              title: "iOS Developer",
              company: "Brokwill Technologies, Kochi, India",
              description: [
                "Independently designed and developed two iOS applications.",
                "Worked under tight deadlines to deliver applications with a small team.",
                "Initiated source control and documentation processes for all projects."
              ],
            },
            {
              date: "Oct 2017 – Jun 2019",
              title: "Web Developer and Graphics Designer",
              company: "Ezek Digital, Kochi, India",
              description: [
                "Designed and developed websites with JavaScript and PHP.",
                "Created top-quality video ads and motion graphics, resulting in high customer return rates."
              ],
            },
            {
              date: "Mar 2017 – Sep 2017",
              title: "iOS Developer",
              company: "Mobtecnica Consultancy, Kochi, India",
              description: [
                "Developed and published 3 iOS applications with Objective C and Swift."
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
            description: "An iOS app to manage shifts for hourly workers, providing seamless scheduling and notifications.",
            link: "https://apps.apple.com/in/app/flexhourz/id1618249870"  // Replace with actual App Store link
          },
          {
            name: "Centavizer",
            description: "A digital solution for centralized customer feedback, designed to gather and analyze user insights.",
            link: "https://centavizer.com"  // Replace with actual App Store link
          },
          {
            name: "EasyBooking",
            description: "A platform for booking services, allowing users to make reservations with just a few clicks.",
            link: "https://apps.apple.com/in/app/easybooking/id1342670369"  // Replace with actual App Store link
          },
          {
            name: "Nikah in Kerala",
            description: "An app to simplify wedding planning in Kerala, offering a directory of services and venues.",
            link: "https://apps.apple.com/in/app/nikah-in-kerala-matrimony/id1222564842"  // Replace with actual App Store link
          },
          {
            name: "Invstars",
            description: "A social platform for investors to share insights and track market trends.",
            link: "https://apps.apple.com/app/invstars"  // Replace with actual App Store link
          },
          {
            name: "Alerts Buddy",
            description: "An alerting application for custom notifications, helping users stay updated on their interests.",
            link: "https://apps.apple.com/app/alerts-buddy"  // Replace with actual App Store link
          }
        ].map((project, index) => (
          <div key={index} className="max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {project.description}
            </p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              View on App Store
            </a>
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

      <div className="flex flex-wrap justify-center gap-12">
        {/* Languages */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Languages</h3>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col items-center">
              <FaSwift size={40} className="text-orange-500" />
              <p>Swift</p>
            </div>
             <div className="flex flex-col items-center">
              <SiDart size={40} className="text-blue-600" />
              <p>Dart</p>
            </div>
            <div className="flex flex-col items-center">
              <SiJavascript size={40} className="text-yellow-500" />
              <p>JavaScript</p>
            </div>
            <div className="flex flex-col items-center">
              <SiPhp size={40} className="text-blue-600" />
              <p>PHP</p>
            </div>
          </div>
        </div>

        {/* Frameworks */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Frameworks</h3>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col items-center">
              <FaSwift size={40} className="text-orange-500" />
              <p>SwiftUI</p>
            </div>
             <div className="flex flex-col items-center">
              <FaFlutter size={40} className="text-orange-500" />
              <p>Flutter</p>
            </div>
            <div className="flex flex-col items-center">
              <SiReact size={40} className="text-blue-500" />
              <p>React</p>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Tools</h3>
          <div className="flex gap-6 justify-center">
             <div className="flex flex-col items-center">
              <SiXcode size={40} className="text-blue-600" />
              <p>Xcode</p>
            </div>
            <div className="flex flex-col items-center">
              <FaGithub size={40} className="text-gray-700 dark:text-gray-200" />
              <p>GitHub</p>
            </div>
            <div className="flex flex-col items-center">
              <FaGit size={40} className="text-red-500" />
              <p>Git</p>
            </div>
            <div className="flex flex-col items-center">
              <SiFirebase size={40} className="text-yellow-500" />
              <p>Firebase</p>
            </div>
          </div>
        </div>
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
            <a href="https://linkedin.com/johnxavierk" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
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
