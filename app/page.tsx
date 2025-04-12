'use client'

import lcs from './page.module.scss'
import { useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import Card from '@/components/Card/Card'
import { CARDS_MOCK } from '@/components/Card/Card.mock'

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  return (
    <main className={lcs.main} ref={container}>
      {
        CARDS_MOCK.map((card, index) => {
          const targetScale = 1 - ( (CARDS_MOCK.length - index) * 0.05)

          return <Card
            key={`p_${index}`}
            index={index}
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
            {...card}
            cardsLength={CARDS_MOCK.length}
          />
        })
      }
    </main>
  )
}
