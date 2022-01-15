import { Box, Card, Grid, Paper, Typography } from "@material-ui/core"

const outcomes = [
  "How to build this landing page with Next.js",
  "How to create API endpoint and integrate with ConvertKit API",
  "How to use React Hook Form and TailwindCSS",
]

const ComingSoonBadge = () => (
  <span className="bg-blue-500 text-white text-xs py-1 px-2 rounded-md mb-4 inline-block">
    Coming Soon!
  </span>
)

const Hero = ({ title, subtitle }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      {/* <Grid container item alignItems="center" justifyContent="center"> */}
      {/* <Box> */}
      <Typography
        component="h1"
        style={{ marginTop: "1rem" }}
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          color: "secondary.main",
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
      {/* </Box> */}
      {/* </Grid> */}
      <Grid container alignItems="center" justifyContent="center">
        <Typography
          component="h3"
          variant="h3"
          align="center"
          color="primary"
          sx={{
            mb: 10,
          }}
        >
          {subtitle}
        </Typography>
        <Grid container>
          <Box pb="2rem"></Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Hero
