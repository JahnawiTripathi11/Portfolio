'use client';
import { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════
   ANIMATIONS
   ══════════════════════════════════════════ */

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.98); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(2deg); }
  66% { transform: translateY(-8px) rotate(-1deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(108, 99, 255, 0.3), 0 0 60px rgba(108, 99, 255, 0.1); }
  50% { box-shadow: 0 0 30px rgba(108, 99, 255, 0.5), 0 0 80px rgba(108, 99, 255, 0.2); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
  40% { transform: translateY(-8px) translateX(-50%); }
  60% { transform: translateY(-4px) translateX(-50%); }
`;

const morphBlob = keyframes`
  0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: rotate(0deg) scale(1); }
  25% { border-radius: 58% 42% 30% 70% / 55% 30% 70% 45%; transform: rotate(90deg) scale(1.05); }
  50% { border-radius: 30% 70% 58% 42% / 70% 55% 45% 30%; transform: rotate(180deg) scale(0.95); }
  75% { border-radius: 70% 30% 42% 58% / 30% 70% 55% 45%; transform: rotate(270deg) scale(1.02); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-60px); filter: blur(10px); }
  to { opacity: 1; transform: translateX(0); filter: blur(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(60px); filter: blur(10px); }
  to { opacity: 1; transform: translateX(0); filter: blur(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); filter: blur(6px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/* ══════════════════════════════════════════
   STYLED COMPONENTS
   ══════════════════════════════════════════ */

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: visible;
  padding: 6rem 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 5rem 0 1rem;
    min-height: 100vh;
  }
`;

const BgLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.border}44 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border}44 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.25;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%);
`;

const GradientMesh = styled.div`
  position: absolute;
  width: ${({ $size }) => $size || '500px'};
  height: ${({ $size }) => $size || '500px'};
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  right: ${({ $right }) => $right};
  bottom: ${({ $bottom }) => $bottom};
  background: ${({ $color }) => $color};
  filter: blur(${({ $blur }) => $blur || '100px'});
  opacity: ${({ $opacity }) => $opacity || '0.25'};
  animation: ${morphBlob} ${({ $speed }) => $speed || '15s'} ease-in-out infinite;

  @media (max-width: 768px) {
    animation: none;
    border-radius: 50%;
  }
`;

const ColorOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background-color: transparent;
  pointer-events: none;
`;

const HeroContainer = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1.5rem;
  }
`;

const TextColumn = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
  }
`;

const Greeting = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.25rem;
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.accentGlow};
  border: 1px solid ${({ theme }) => theme.colors.accent}33;
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 0.3s;
`;

const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4CAF50;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const NameWrapper = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.75rem;
    margin-bottom: 1rem;
  }
`;

const NameLine = styled.div`
  overflow: hidden;
  display: block;
`;

const NameText = styled.span`
  display: inline-block;
  opacity: 0;
  animation: ${slideInLeft} 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: ${({ $delay }) => $delay || '0.5s'};
  color: ${({ theme }) => theme.colors.text};
`;

const GradientName = styled.span`
  display: inline-block;
  opacity: 0;
  background: ${({ theme }) => theme.colors.gradient};
  background-size: 200% 200%;
  animation-name: ${slideInRight}, ${gradientShift};
  animation-duration: 0.9s, 4s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94), ease;
  animation-fill-mode: forwards, none;
  animation-delay: ${({ $delay }) => $delay || '0.7s'}, 0s;
  animation-iteration-count: 1, infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const RoleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: 1s;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 0.75rem;
  }
`;

const RoleLine = styled.div`
  width: 40px;
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
`;

const RoleText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 520px;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 1.1s;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
    line-height: 1.6;
  }

  strong {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 600;
  }
`;

const HeroActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 1.3s;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.gradient};
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px ${({ theme }) => theme.colors.accentGlow};
    &::before { transform: translateX(100%); }
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 2.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.4s ease;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
    color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.accentGlow};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  opacity: 0;
  animation: ${slideUp} 0.8s ease forwards;
  animation-delay: 1.5s;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(10px);
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-4px) rotate(-3deg);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.accentGlow};
  }
`;

const AvatarColumn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 420px;
  height: 520px;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 300px;
    height: 370px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 220px;
    height: 270px;
    animation: none;
  }
`;

const AvatarGlow = styled.div`
  position: absolute;
  inset: -20px;
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.gradient};
  opacity: 0.15;
  filter: blur(40px);
  animation: ${glow} 3s ease-in-out infinite;
`;

const AvatarFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const OrbitRing = styled.div`
  position: absolute;
  inset: -30px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  animation: spin 20s linear infinite;
  z-index: 1;
  opacity: 0.5;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const OrbitDot = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  right: ${({ $right }) => $right};
  bottom: ${({ $bottom }) => $bottom};
  box-shadow: 0 0 15px ${({ $color }) => $color}88;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  animation: ${bounce} 2.5s ease infinite;
  cursor: pointer;
  z-index: 10;
`;

const ScrollMouse = styled.div`
  width: 26px;
  height: 42px;
  border-radius: 13px;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  position: relative;
  animation: ${glow} 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 8px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.accent};
    animation: ${keyframes`
      0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
      50% { opacity: 0.3; transform: translateX(-50%) translateY(8px); }
    `} 1.5s ease-in-out infinite;
  }
`;

const ScrollText = styled.span`
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
`;

/* ══════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════ */

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const heroRef = useRef(null);
  const textColumnRef = useRef(null);
  const avatarColumnRef = useRef(null);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ── GSAP ScrollTrigger — simple text fade on scroll ── */
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
        }
      });

      tl.to(textColumnRef.current, {
        opacity: 0,
        x: isRTL ? 50 : -50,
        duration: 1,
        ease: 'power1.inOut'
      }, 0);

      tl.to(avatarColumnRef.current, {
        x: isRTL ? 150 : -150,
        duration: 1,
        ease: 'power1.inOut'
      }, 0);

      tl.to('.scroll-indicator-hero', {
        opacity: 0,
        duration: 0.3
      }, 0);

    }, heroRef);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isRTL]);

  return (
    <HeroSection id="hero" ref={heroRef}>
      {/* ── Background ── */}
      <BgLayer>
        <GridPattern />
        <ColorOverlay className="hero-color-overlay" />
        <GradientMesh $color="radial-gradient(circle, #10B981, #059669)" $size="600px" $top="-15%" $left="5%" $speed="18s" $blur="120px" $opacity="0.2" />
        <GradientMesh $color="radial-gradient(circle, #0EA5E9, #38BDF8)" $size="450px" $top="60%" $right="0%" $speed="22s" $blur="100px" $opacity="0.15" />
        <GradientMesh $color="radial-gradient(circle, #6366F1, #818CF8)" $size="350px" $bottom="-10%" $left="30%" $speed="25s" $blur="90px" $opacity="0.12" />
      </BgLayer>

      <HeroContainer>
        <TextColumn ref={textColumnRef}>
          <Greeting>
            <StatusDot />
            {t('hero.greeting')}
          </Greeting>

          <NameWrapper>
            <NameLine>
              <NameText $delay="0.5s">{t('hero.name')} </NameText>
            </NameLine>
            <NameLine>
              <GradientName $delay="0.7s">{t('hero.lastName')}</GradientName>
            </NameLine>
          </NameWrapper>

          <RoleWrapper>
            <RoleLine />
            <RoleText>Full-Stack Developer</RoleText>
          </RoleWrapper>

          <Subtitle>
            {t('hero.subtitle')}{' '}
            <strong>{t('hero.subtitleHighlight')}</strong>{' '}
            {t('hero.subtitleEnd')}
          </Subtitle>

          <HeroActions>
            <PrimaryBtn
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
            >
              {t('hero.viewWork')} →
            </PrimaryBtn>
            <SecondaryBtn
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            >
              {t('hero.getInTouch')}
            </SecondaryBtn>
          </HeroActions>

          <SocialLinks>
            <SocialIcon href="https://github.com/JahnawiTripathi11" target="_blank" rel="noopener noreferrer"><FiGithub /></SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/jahnawi-tripathi-8b5b0a37b/" target="_blank" rel="noopener noreferrer"><FiLinkedin /></SocialIcon>
          </SocialLinks>
        </TextColumn>

        {/* ── Right: Photo ── */}
        <AvatarColumn ref={avatarColumnRef}>
          <AvatarWrapper>
            <AvatarGlow />
            <OrbitRing>
              <OrbitDot $color="#10B981" $top="0" $left="50%" />
              <OrbitDot $color="#E040FB" $bottom="10%" $right="0" />
              <OrbitDot $color="#00BCD4" $bottom="10%" $left="0" />
            </OrbitRing>
            <AvatarFrame>
  <img
    src="/images/jahnawi.jpeg"
    alt="Jahnawi Tripathi"
    style={{ 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover', 
      objectPosition: 'center top' 
    }}
  />
</AvatarFrame>
          </AvatarWrapper>
        </AvatarColumn>
      </HeroContainer>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator className="scroll-indicator-hero" onClick={() => scrollTo('about')}>
        <ScrollMouse />
        <ScrollText>{t('hero.scroll')}</ScrollText>
      </ScrollIndicator>
    </HeroSection>
  );
}