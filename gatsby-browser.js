import "./src/styles/index.css"

export const onClientEntry = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual"
  }
}

export const onRouteUpdate = ({ location }) => {
  if (!location.hash) {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    })
  }
}
