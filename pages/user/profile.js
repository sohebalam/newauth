// import React, { useState, useEffect } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Alert } from "@material-ui/lab"
import PersonIcon from "@material-ui/icons/Person"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { CircularProgress } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile, loadUser } from "../../redux/actions/userActions"
import { getSession } from "next-auth/react"

import { Box } from "@material-ui/core"
import { wrapper } from "../../redux/store"
// import UserNav from "../../components/layout/UserNav"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profile: {
    marginTop: theme.spacing(19),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Profile = () => {
  const { dbUser, loading, message } = useSelector((state) => state.profile)
  const {
    error,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.update)
  const dispatch = useDispatch()
  console.log(dbUser)
  useEffect(() => {
    if (!dbUser) {
      dispatch(loadUser())
      setUser({
        name: dbUser?.name,
        email: dbUser?.email,
      })
    } else if (dbUser) {
      setUser({
        name: dbUser.name,
        email: dbUser.email,
      })
    }

    if (error) {
      console.log(error)
    }
  }, [dispatch, dbUser, isUpdated])
  const classes = useStyles()

  const router = useRouter()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = user

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
    }

    dispatch(updateProfile(userData))
    router.reload()
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      {loading || updateLoading ? (
        <CircularProgress />
      ) : (
        dbUser && (
          <Grid container>
            <Grid item sm={4}>
              <Box mt="0.5rem">{/* <UserNav /> */}</Box>
            </Grid>

            <Grid item sm={4}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Update Profile
                  </Typography>
                  {loading && <CircularProgress />}
                  {message && <Alert severity="success">{message}</Alert>}
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={submitHandler}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="name"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="Name"
                          label="Name"
                          autoFocus
                          value={user?.name || ""}
                          onChange={onChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={user?.email || ""}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          // value={user?.password || ""}
                          onChange={onChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Update Profile
                    </Button>
                    <Grid container justifyContent="flex-end"></Grid>
                  </form>
                </div>
              </Container>
            </Grid>
            <Grid item sm={4}>
              <Box styles={{ marginTop: "1rem" }}>
                <Container component="main" maxWidth="xs">
                  <div className={classes.profile}>
                    {dbUser && (
                      <div>
                        <p>Signed in as {dbUser?.email}</p>
                        <p>Name: {dbUser?.name}</p>
                        <img src={dbUser?.image} alt={dbUser?.name} />
                      </div>
                    )}
                  </div>
                </Container>
              </Box>
            </Grid>
          </Grid>
        )
      )}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })

      store.dispatch(loadUser(req.headers.cookie, req))

      if (!session || !session.user.role.includes("user")) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        }
      }
    }
)

export default Profile
