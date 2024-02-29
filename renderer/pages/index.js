import { useEffect, useState } from 'react'
import { filePath } from '../utils/config'
import styles from '../styles/Home.module.css'

export default function Home() {
  useEffect(() => {
    // on mount
  }, [])
  return (
    <div className={styles.wrapper}>
      <h1>Edit the file path in config.js to show the video below</h1>
      <video
        src={`media-loader:///${filePath}/idle.mp4`}
        className={styles.video}
        autoPlay
        loop
        muted
      ></video>
    </div>
  )
}
