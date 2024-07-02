'use client'

import Image from 'next/image'
import lcs from './Card.module.scss'
import { CardData } from './Card.data'
import { FC, useRef } from 'react'
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion'

interface CardProps extends CardData {
  progress: MotionValue<number>
  range: any
  targetScale: number
  index: number
}

const Card: FC<CardProps> = (props) => {
  const { title, description, src, color, index, progress, range, targetScale } = props

  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className={lcs.container}>
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top:`calc(-5vh + ${index * 30}px)`
        }}
        className={lcs.card}
      >
        <h2 className={lcs.title}>{title}</h2>
        <div className={lcs.body}>
          <div className={lcs.description}>
            <p>{description}</p>
          </div>
          <div className={lcs.image}>
            <motion.div
              className={lcs.inner}
              style={{scale: imageScale}}
            >
              <Image
                fill
                src={`/images/${src}`}
                alt='alt'
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card
