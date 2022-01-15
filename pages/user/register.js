import React, { useState, useEffect } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { userRegister, socialReg } from "../../redux/actions/userActions"
import { CircularProgress } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { getSession, useSession, signIn } from "next-auth/react"
import validator from "validator"

import {
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons"
import TwitterIcon from "@material-ui/icons/Twitter"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const Register = () => {
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // })
  const router = useRouter()
  const dispatch = useDispatch()
  const [userError, setUserError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [name, setName] = useState("")
  const { data: session } = useSession()
  const register = useSelector((state) => state.register)
  const { loading, error, success, message } = register

  // console.log(register)

  const profile = useSelector((state) => state.profile)

  const { dbUser } = profile

  useEffect(() => {
    if (success) {
      router.push("/user/login")
    }
    if (error) {
      setUserError(error)

      // setTimeout
      // dispatch(clearErrors())
    }
  }, [dispatch, success, error, message])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setUserError("Please add all fields")
      return
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" })
    }

    if (password !== conPassword) {
      setUserError("Passwords do not match")
      return
    }

    if (!validator.isEmail(email)) {
      setUserError("Not a valid email")
      return
    }

    const userData = {
      name,
      email,
      password,
      conPassword,
    }
    // console.log(userData)
    // return
    dispatch(userRegister(userData))
  }

  if (session) {
    const { user } = session
    // console.log(user)

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: null,
    }

    if (!dbUser) {
      if (user.id) {
        dispatch(socialReg(userData))
        // console.log(userData)
      }
    }
  }

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="md">
      <Grid container>
        <Grid item xs={5}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {loading && <CircularProgress />}
            {message && <Alert severity="success">{message}</Alert>}
            {message
              ? ""
              : (error || userError) && (
                  <Alert severity="error">{error || userError}</Alert>
                )}
            <form className={classes.form} noValidate onSubmit={submitHandler}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
             <TextField
               variant="outlined"
               required
               fullWidth
               id="lastName"
               label="Last Name"
               name="lastName"
               autoComplete="lname"
             /> */}
                {/* </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="conPassword"
                    label="Confirm Password"
                    type="password"
                    id="conPassword"
                    autoComplete="current-password"
                    value={conPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/user/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
        <Grid item sm={1}></Grid>

        <Grid item xs={5}>
          {/* <Container maxWidth="xs"> */}
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <TwitterIcon />
            </Avatar>
            <Typography
              component="h2"
              variant="h5"
              style={{ marginBottom: "1rem" }}
            >
              Social Sign up
            </Typography>
            {/* <FacebookLoginButton onClick={() => signIn("facebook")} /> */}
            <GoogleLoginButton onClick={() => signIn("google")} />
            <TwitterLoginButton onClick={() => signIn("twitter")} />
            <LinkedInLoginButton onClick={() => signIn("linkedin")} />
            <GithubLoginButton onClick={() => signIn("github")} />
          </div>
          {/* </Container> */}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
