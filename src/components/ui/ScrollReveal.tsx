import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.05,
  baseRotation = 2,
  blurStrength = 6,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom 65%',
}) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  // Split text into individual characters for letter-by-letter motion reveal
  const splitElements = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    if (!text) return children;

    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span key={wIdx} className="word inline-block whitespace-nowrap mr-[0.25em]">
        {word.split('').map((char, cIdx) => (
          <span key={cIdx} className="char inline-block transition-colors">
            {char}
          </span>
        ))}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Refresh ScrollTrigger after layout settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      // Rotation animation
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=5%',
            end: rotationEnd,
            scrub: 1,
          },
        }
      );

      const charElements = el.querySelectorAll('.char');
      const targetElements = charElements.length > 0 ? charElements : el.querySelectorAll('.word');

      if (targetElements.length > 0) {
        // Opacity & Y translation letter-by-letter motion reveal
        gsap.fromTo(
          targetElements,
          { opacity: baseOpacity, y: 14, willChange: 'opacity, transform, filter' },
          {
            ease: 'power2.out',
            opacity: 1,
            y: 0,
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=10%',
              end: wordAnimationEnd,
              scrub: 0.8,
            },
          }
        );

        if (enableBlur) {
          // Blur reduction
          gsap.fromTo(
            targetElements,
            { filter: `blur(${blurStrength}px)` },
            {
              ease: 'none',
              filter: 'blur(0px)',
              stagger: 0.03,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom-=10%',
                end: wordAnimationEnd,
                scrub: 0.8,
              },
            }
          );
        }
      }
    }, containerRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
      <div className={`scroll-reveal-text ${textClassName}`.trim()}>{splitElements}</div>
    </h2>
  );
};

export default ScrollReveal;
