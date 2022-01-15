import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Hero from "../components/layout/Hero"
import axios from "axios"
import { Grid, Paper } from "@material-ui/core"
import { Box } from "@mui/system"
import { wrapper } from "../redux/store"
import { useSelector } from "react-redux"
import { getSession } from "next-auth/react"
import { loadUser } from "../redux/actions/userActions"

const Home = () => {
  return (
    <div>
      <Paper style={{ marginTop: "0.5rem" }}>
        <Hero
          // imgSrc="/home-hero.jpg"
          // imgAlt="satified woman eating in restaurant"
          title="OpenFreeUni"
          subtitle="Learn for Free!"
        />
      </Paper>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })

      // const userData = session?.user

      if (!session) await store.dispatch(loadUser(req.headers.cookie, req))
    }
)

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const session = await getSession({ req })

//       // console.log(session)

//       // store.dispatch(loadUser(req.headers.cookie, req))

//       if (!session) {
//         return {
//           redirect: {
//             destination: "/user/login",
//             permanent: false,
//           },
//         }
//       }
//     }
// )

export default Home
