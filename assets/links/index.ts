import { AiFillHome } from "react-icons/ai"
import { BsFileCodeFill, BsGraphUp, BsTwitter } from "react-icons/bs"
import CodeIcon from "@mui/icons-material/Code"
import { FaDiscord, FaLinkedinIn, FaFacebook } from "react-icons/fa"
import { HiMail } from "react-icons/hi"
import { MdAdminPanelSettings, MdOutlineSocialDistance } from "react-icons/md"
import { SiGoogleanalytics } from "react-icons/si"
import { FiSettings } from "react-icons/fi"

export const headerLinks = [
  {
    link: "/",
    label: "Home",
  },
  // {
  //   link: "/about",
  //   label: "Features",
  // },
  {
    link: "#1",
    label: "Documentation",
    links: [
      {
        link: "/Brochure_CoEAMT.pdf",
        label: "About CoEAMT",
      },
      {
        link: "/Software_Manual.pdf",
        label: "About the software",
      },
    ],
  },
  {
    link: "/developers",
    label: "Developers",
  },
]

export const slidelinks = [
  { label: "Metal Industry", value: "metal" },
  { label: "Mining", value: "mining" },
  { label: "Cement", value: "cement" },
  { label: "Oil", value: "oil" },
  { label: "Chemical", value: "chemical" },
]

export const slideItems = {
  metal: {
    label: "Reducing Downtime in Metal Industry",
    detail:
      "Our IoT driven Predictive maintenance solution helps to reduce downtime, monitor, collect exchange and analyze data from machines to enhance manufacturing processes",
    image: "metal.png",
  },
  mining: {
    label: "Machine failure in the mines?",
    detail:
      "Our solutions can add immense value to your entire mining supply chain by harnessing the power of Industry 4.0. The asset performance will be optimized, costs and machine downtime can be reduced leading to a boost in ROI.",
    image: "mining.png",
  },
  cement: {
    label: "No more unplanned downtime in Cement",
    detail:
      "Our Industry 4.0 digital solutions can help you tackle the challenges in cement production such as large energy consumption, high costs and complex processes. Our advanced analytics can simplify complexities and help in real-time decisionmaking. Equipment lifespan and reliability will amplify due to our condition monitoring system.",
    image: "cement.png",
  },
  oil: {
    label: "Protect your assets with Zone Approved",
    detail:
      "Our digitization solutions in industrial equipment maintenance can help oil and gas companies streamline maintenance. Our predictive analytics and conditional data monitoring help anticipate failures, reducing unplanned maintenance and unscheduled downtime.",
    image: "oil.png",
  },
  chemical: {
    label: "No more Downtime in Chemical Plants",
    detail:
      "Our AI driven analytics can propel your chemical business to new heights of reliability by optimizing asset longevity and impacting top-line growth through proactive identification of upcoming machine failures. IoT driven asset maintenance solutions can provide immense flexibility and agility to production.",
    image: "chemical.png",
  },
}

export const footerLinks = [
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    link: "https://www.linkedin.com/company/coeamt/",
  },
  {
    Icon: FaFacebook,
    label: "Facebook",
    link: "https://www.facebook.com/coeiitkgp",
  },
  {
    Icon: HiMail,
    label: "Mail",
    link: `mailto:${"coeamt@iitkgp.ac.in"}`,
  },
]

export const drawerLinks = [
  { label: "Home", link: "/", Icon: AiFillHome, type: "route" },
  {
    label: "About",
    link: "",
    Icon: MdOutlineSocialDistance,
    type: "link",
  },
  {
    label: "Team",
    link: "",
    Icon: BsFileCodeFill,
    type: "link",
  },
  {
    label: "Twitter",
    link: "",
    Icon: BsTwitter,
    type: "link",
  },
  {
    label: "Discord",
    link: "",
    Icon: FaDiscord,
    type: "link",
  },
]

export const menuItems: {
  id: number
  label: string
  // Icon: any
  link: string
  active: boolean
}[] = [
  {
    id: 1,
    label: "Monitoring",
    // Icon: SiGoogleanalytics,
    link: "/monitoring",
    active: true,
  },
  {
    id: 2,
    label: "Configuration",
    // Icon: FiSettings,
    link: "/configuration",
    active: false,
  },
  {
    id: 3,
    label: "Administration",
    // Icon: MdAdminPanelSettings,
    link: "/administration",
    active: true,
  },
  // {
  //   id: 4,
  //   label: "Summary",
  //   Icon: BsJournalText,
  //   link: "/summary",
  //   active: true,
  // },
  {
    id: 4,
    label: "Metrics",
    // Icon: BsGraphUp,
    link: "/metrics",
    active: true,
  },
  {
    id: 5,
    label: "Developers",
    // Icon: CodeIcon,
    link: "/developers",
    active: true,
  },
]

module.exports = {
  headerLinks,
  slideItems,
  slidelinks,
  footerLinks,
  drawerLinks,
  menuItems,
}
