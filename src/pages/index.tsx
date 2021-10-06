import React from "react";
import Head from 'next/head'
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';
import CompletedChalenges from "../components/CompletedChalenges";
import CountDown from "../components/CountDown";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
      <title> Início | moveit</title>  
      </Head> 
      <ExperienceBar />

      <section>
          <div>
            <Profile />
            <CompletedChalenges />
            <CountDown />
          </div>
          <div>
          </div>
      </section>
    </div> 
  )
}
