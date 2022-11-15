import { GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import { getSortedPostsData } from '../lib/post';
import homeStyles from '../styles/Home.module.css'

export default function Home({ allPostsData }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <div>
      <Head>
        <title>jude4264</title>
        {/* <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <section className="homeStyles.headingMd">
        <p>[jude4264 Introduction]</p>
        <p>(This is a sample website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({date, id, title})=>
            <li className={homeStyles.listItem} key ={id}>
              <a>{title}</a>
              <br/>
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps =async () => {

  const allPostsData = getSortedPostsData();
  return{
    props : {
      allPostsData
    }
  }
  
}
