import React, { useState, useEffect, useRef } from 'react';

// ============================================
// YASIN AKTAŞ - PREMIUM PORTFOLIO PREVIEW
// Swiss Design | Ultra-Minimalist | High-End
// ============================================

const stats = [
  { value: 1000, suffix: '+', label: 'Brands Served' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 10, suffix: '+', label: 'Team Members' },
  { value: 4, suffix: '', label: 'Years at Turkuvaz' },
];

const projects = [
  { id: 1, title: 'Kreatif Tanitim Filmi', category: 'Commercial / AI', year: '2024' },
  { id: 2, title: 'Marka Kampanyasi', category: 'Brand Film', year: '2024' },
  { id: 3, title: 'AI-Powered Production', category: 'AI Video', year: '2024' },
  { id: 4, title: 'Sosyal Medya Serisi', category: 'Social Content', year: '2024' },
  { id: 5, title: 'Kurumsal Belgesel', category: 'Documentary', year: '2023' },
  { id: 6, title: 'Motion Graphics', category: 'Animation', year: '2023' },
];

const experience = [
  { role: 'Founder & Creative Director', company: 'Creative Touch Productions', period: '2025', isExit: true },
  { role: 'Creative Videographer', company: 'Turkuvaz Medya', period: '2021 - 2025' },
  { role: 'Intern', company: 'TV8 / Acun Medya', period: '2020' },
];

// Animated Counter
function Counter({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{
        display: 'block',
        fontSize: 'clamp(3rem, 8vw, 7rem)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}>
        {count}{suffix}
      </span>
      <span style={{
        display: 'block',
        fontSize: '10px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        marginTop: '12px',
      }}>
        {label}
      </span>
    </div>
  );
}

// Video Card
function VideoCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16/9',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#0a0a0a',
        transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Placeholder gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, rgba(255,255,255,${isHovered ? 0.08 : 0.03}) 0%, rgba(255,255,255,0.01) 100%)`,
        filter: isHovered ? 'grayscale(0)' : 'grayscale(1)',
        transition: 'all 0.7s ease-out',
        transform: isHovered ? 'scale(1)' : 'scale(1.05)',
      }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.5s',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '8px',
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          opacity: isHovered ? 1 : 0.6,
          transition: 'all 0.4s',
        }}>
          {project.category}
        </p>
        <h3 style={{
          fontSize: 'clamp(18px, 3vw, 28px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          opacity: isHovered ? 1 : 0.8,
          transition: 'all 0.4s 0.05s',
        }}>
          {project.title}
        </h3>
      </div>

      {/* Play icon */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        width: '48px',
        height: '48px',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'scale(1)' : 'scale(0.75)',
        transition: 'all 0.5s',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </div>

      {/* Year */}
      <span style={{
        position: 'absolute',
        top: '24px',
        left: '24px',
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.3)',
      }}>
        {project.year}
      </span>
    </div>
  );
}

export default function YasinPortfolio() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      backgroundColor: '#050505',
      color: '#e5e5e5',
      minHeight: '100vh',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #fff; color: #050505; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        mixBlendMode: 'difference',
        padding: '24px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Yasin Aktas
        </span>
        <div style={{ display: 'flex', gap: '40px' }}>
          {['Work', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'inherit',
              textDecoration: 'none',
              opacity: 0.5,
            }}>
              {item}
            </a>
          ))}
        </div>
        <span style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>
          Get in Touch
        </span>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '128px',
        paddingLeft: '32px',
        paddingRight: '32px',
        position: 'relative',
      }}>
        <div style={{
          maxWidth: '1800px',
          width: '100%',
          margin: '0 auto',
          opacity: Math.max(0, 1 - scrollY / 400),
          transform: `translateY(${scrollY * 0.3}px)`,
        }}>
          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <span style={{ width: '64px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              Istanbul, Turkey
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(3.5rem, 15vw, 14rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            textTransform: 'uppercase',
          }}>
            Creative
          </h1>
          <h1 style={{
            fontSize: 'clamp(3.5rem, 15vw, 14rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
            textTransform: 'uppercase',
            WebkitTextStroke: '1px rgba(255,255,255,0.3)',
            WebkitTextFillColor: 'transparent',
          }}>
            Director
          </h1>

          {/* Subtitle */}
          <p style={{
            maxWidth: '560px',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7,
            marginTop: '48px',
            fontWeight: 300,
          }}>
            5 yildir video produksiyon ve sahada gazetecilik alanlarinda aktif olarak calisiyorum. 
            Yapay zeka destekli post-produksiyon sureclerini profesyonelce yonetiyorum.
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          }} />
        </div>
      </section>

      {/* Stats */}
      <section style={{
        padding: '128px 32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{
          maxWidth: '1800px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
        }}>
          {stats.map((stat, i) => (
            <Counter key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" style={{ paddingBottom: '128px' }}>
        <div style={{ padding: '0 32px', maxWidth: '1800px', margin: '0 auto 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '16px' }}>
                Selected Work
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Portfolio
              </h2>
            </div>
            <a href="https://instagram.com/creativetouchss" target="_blank" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
            }}>
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
        <div style={{
          padding: '0 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '16px',
        }}>
          {projects.map((project, i) => (
            <VideoCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{
        padding: '128px 32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '1800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '128px' }}>
          <div>
            <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '24px' }}>
              About
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              The Fusion of<br />
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>Media & AI</span>
            </h2>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '24px' }}>
              Turkuvaz Medya'da 4 yil Kreatif Videographer olarak gorev aldim. Burada hem marka 
              kampanyalari hem de haber icerikleri uretirken, teknik becerilerimi gazetecilik 
              perspektifiyle birlestirdim.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: '32px' }}>
              Ancak kariyerimdeki en onemli evrilme, Creative Touch Productions reklam ajansi ile 
              gerceklesti. 10 kisilik bir ekibi yoneterek binlerce markaya reklam filmi, yapay zeka 
              destekli video icerikleri ve dijital danismanlik hizmetleri sundum.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {['Adobe Premiere', 'After Effects', 'AI Tools', 'Drone Ops', 'Brand Strategy', 'Team Lead'].map(skill => (
                <span key={skill} style={{
                  padding: '8px 16px',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section style={{
        padding: '128px 32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '24px' }}>
            Experience
          </span>
          {experience.map((exp, i) => (
            <div key={i} style={{
              borderTop: '1px solid rgba(255,255,255,0.05)',
              padding: '48px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {exp.role}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>{exp.company}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>{exp.period}</span>
                {exp.isExit && (
                  <span style={{
                    padding: '4px 12px',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                    Exited
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exit Milestone */}
      <section style={{
        padding: '128px 32px',
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.02), transparent)',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '32px' }}>
          Milestone
        </span>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 10vw, 10rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          textTransform: 'uppercase',
        }}>
          Exited
        </h2>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 10vw, 10rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          textTransform: 'uppercase',
          WebkitTextStroke: '1px rgba(255,255,255,0.2)',
          WebkitTextFillColor: 'transparent',
        }}>
          in 2026
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '32px', maxWidth: '400px', margin: '32px auto 0', fontSize: '14px', lineHeight: 1.7 }}>
          Ocak 2026'da Creative Touch Productions ajansini Hamburg merkezli bir teknoloji sirketine devretti.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        padding: '128px 32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '32px' }}>
          Contact
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '32px' }}>
          Let's Create<br />Something Great
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '400px', margin: '0 auto 48px' }}>
          Yaraticilik, teknik donanimim ve ekip yonetimi tecrubemle projelerinize deger katmak icin hazirim.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '64px' }}>
          <a href="mailto:yasin.aktas@outlook.com.tr" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 32px',
            backgroundColor: '#fff',
            color: '#050505',
            textDecoration: 'none',
            fontWeight: 500,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22,7-8.97,5.7a1.94,1.94,0,0,1-2.06,0L2,7" />
            </svg>
            yasin.aktas@outlook.com.tr
          </a>
          <a href="tel:+905304653974" style={{
            padding: '16px 32px',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
          }}>
            +90 530 465 39 74
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          {['LinkedIn', 'Instagram', 'Website'].map(link => (
            <a key={link} href="#" style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
            }}>
              {link}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.3)',
      }}>
        <span>2024 Yasin Aktas. All rights reserved.</span>
        <span>Designed with precision in Istanbul.</span>
      </footer>
    </div>
  );
}
