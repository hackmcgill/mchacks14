const teamSocialLinks = {
  Aidan: "https://adntaha.github.io/",
  Alex: "https://www.instagram.com/aalex.wang/",
  Amy: "https://www.linkedin.com/in/amyddao/",
  Arnav: "https://www.linkedin.com/in/arnavkhanna11",
  Choshika: "https://www.linkedin.com/in/choshika-bagratee",
  Doaa: "https://www.linkedin.com/in/doaa-c-731aa5322/",
  Emily: "https://www.linkedin.com/in/emily-meiyang-yu",
  Jaanya: "https://www.linkedin.com/in/jaanya-arora-3a38b8386",
  Jamie: "https://www.linkedin.com/in/jamiexiao/",
  Jeffrey: "https://www.instagram.com/jeffrey_dai_/",
  Jimmy: "https://www.linkedin.com/in/jimmy-j-xu/",
  Julia: "",
  Lyland: "",
  Mona: "",
  Muhammad: "https://www.linkedin.com/in/mfsohail/",
  Qian: "",
  Remi: "",
  Shirley: "",
  Jane: "https://www.linkedin.com/in/janekhuong/",
  Jongmin: "https://www.linkedin.com/in/jo-9m-n1/",
  Jen: "",
  Clara: "https://www.linkedin.com/in/clara-goussanou",
  Ashley: "",
  Janelle: "",
  Ikram: "https://www.linkedin.com/in/ikram-maachy-721a391b7",
  Carolyn: "https://www.linkedin.com/in/carolyn-re-yang/",
  Daniel: "https://www.linkedin.com/in/daniel-wei1"
}

const normalizeUrl = (raw) => {
  if (!raw || typeof raw !== "string") return null
  const trimmed = raw.trim()
  if (!trimmed) return null

  const token = trimmed.split(/\s+/)[0]
  if (/^https?:\/\//i.test(token)) return token
  return `https://${token}`
}

export const resolveTeamSocialUrl = (name) => {
  const entry = teamSocialLinks[name]
  if (!entry) return null

  if (typeof entry === "string") return normalizeUrl(entry)

  if (typeof entry === "object") {
    return normalizeUrl(entry.linkedin) || normalizeUrl(entry.instagram)
  }

  return null
}

export default teamSocialLinks
