import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './ScrollReveal.css'

const TEXT =
  "I build secure, scalable, and user-focused digital solutions across web, mobile, and AI. Every project begins with understanding the problem, designing with purpose, and developing with precision. The goal isn't just to write code it's to create technology that delivers lasting value."

function Word({ word, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  const color   = useTransform(progress, [start, end], ['#444444', '#ffffff'])

  return (
    <motion.span className="sr-word" style={{ opacity, color }}>
      {word}{' '}
    </motion.span>
  )
}

export default function ScrollReveal() {
  const textRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 65%', 'end 50%'],
  })

  const words = TEXT.split(' ')

  return (
    <section className="sr-section">
      <div className="sr-inner">
        <p className="sr-text" ref={textRef}>
          {words.map((word, i) => {
            const step  = 1 / words.length
            const start = i * step
            const end   = (i + 1) * step
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            )
          })}
        </p>
      </div>
    </section>
  )
}
