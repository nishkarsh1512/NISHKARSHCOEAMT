import { memo } from "react"
import Navbar from "../components/Navbar/Navbar"
import TeamCard from "../components/Developers/TeamCard"
import { FaFacebook, FaLinkedinIn } from "react-icons/fa"
import { HiMail } from "react-icons/hi"
import Image from "next/image"

const developers = () => (
  <div className="flex flex-col px-[80px]">
    <Navbar isDevsPage />

    <div className="mt-[90px] mx-auto text-[40px] py-2.5 mb-7 font-medium bg-lightBlue text-white w-full flex items-center justify-between rounded-xl">
      <h1 className="mx-auto">Principal Investigator</h1>
    </div>

    {/* Sir */}
    <div className="flex items-center gap-5 w-full relative left-[160px]">
      <Image
        src="/images/professor.png"
        alt=""
        loading="lazy"
        className="rounded-full shadow w-[300px]"
      />
      <div className="text-xl flex flex-col">
        <h3 className="text-[40px] font-medium mb-6">Prof. Surjya K Pal</h3>
        <span>
          Chairperson, Centre of Excellence in Advanced Manufacturing Technology
        </span>
        <span>Mechanical Engineering IIT Kharagpur</span>

        <div className="flex items-center gap-2 mt-2.5">
          {[
            {
              Icon: FaLinkedinIn,
              label: "LinkedIn",
              link: "https://www.linkedin.com/in/prof-surjya-k-pal-289b681a3",
            },
            {
              Icon: FaFacebook,
              label: "Facebook",
              link: "https://www.facebook.com/surjyak.pal",
            },
            {
              Icon: HiMail,
              label: "Mail",
              link: `mailto:"surjya.pal@icloud.com`,
            },
          ].map((item: any) => (
            <span
              onClick={() => window.open(item.link, "_blank")}
              className="rounded-full p-2.5 sm600:text-xl text-lg border-black hover:border-lightBlue2 border-2 text-black hover:text-lightBlue2 sm600:hover:scale-110 transition-all duration-500 cursor-pointer"
              key={item.label}
            >
              <item.Icon />
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-[80px] text-[40px] py-2.5 mb-2.5 font-medium bg-lightBlue text-white w-full flex items-center justify-between rounded-xl">
      <h1 className="mx-auto">Team</h1>
    </div>

    <div className="flex items-center gap-2 justify-around">
      {[
        {
          name: "Kunal Mondal",
          image: "/images/kunla.jpeg",
          socials: {
            linkedIn: "https://www.linkedin.com/in/kunal-mondal-41baa8212/",
            email: "2002kunalmondal13@gmail.com",
          },
          assignation:
            "UG Student, Computer Science & Enginnering, IES University",
        },
        {
          name: "Abhrodeep Das",
          image: "/images/abhrodeep_das.jpeg",
          socials: {
            linkedIn: "https://in.linkedin.com/in/abhrodeep-das-5a5354202",
            email: "abhrodeepdas1508@gmail.com",
          },
          assignation:
            "UG Student, Computer Science, Jalpaiguri Govt. Engg. College",
        },
        {
          name: "Ayushman Agrawal",
          image: "/images/ayushman.jpeg",
          socials: {
            linkedIn:
              "https://www.linkedin.com/in/ayushman-agrawal-144877206/?originalSubdomain=in",
            email: "ayushman.iitkgp2020@gmail.com",
          },
          assignation: "UG Student, Mechanical Engineering, IIT Kharagpur",
        },
        {
          name: "Nishkarsh Kundoliya",
          image: "/images/nishkarsh.jpeg",
          socials: {
            linkedIn:
              "https://www.linkedin.com/in/nishkarsh-kundoliya-026203242/",
            email: "nishkarsh1215@gmail.com",
          },
          assignation:
            "UG Student, Ocean Engg and Naval Architecture, IIT Kharagpur",
        },
        {
          name: "Ananta Dutta",
          image: "/images/ananta_dutta.png",
          socials: {
            linkedIn: "https://www.linkedin.com/in/ananta-dutta-49674087/",
            email: "duttaananta03@gmail.com",
          },
          assignation:
            "Doctoral Scholar, Mechanical Engineering, IIT Kharagpur",
        },
      ].map((member, index) => (
        <TeamCard member={member} key={member.name} />
      ))}
    </div>
    <div className="mt-[5px] text-[40px] py-1.5 mb-4.5 font-medium bg-lightBlue text-white w-full flex items-center justify-between rounded-xl">
      <h1 className="mx-auto">Appreciation</h1>
    </div>
    <div className="mt-[5px] text-[20px] py-1.5 mb-[150px] pb-4.5 font-medium text-black w-full flex items-center justify-between rounded-xl">
      Heartfelt appreciation to RDCIS-SAIL for their continuous support and
      invaluable suggestions on optimizing the "EyeVib" software. The weekly
      meetings were enriched by the insightful inputs from Mr. Rishi Kumar, Dr.
      Sanjoy Parida, Mr. Shrujan Mallarapu, and Mr. Aneesh P Appukuttan, each
      contributing significantly to the refinement of the software. Special
      thanks to the entire RDCIS team for their unwavering commitment and
      instrumental support in enhancing the software's functionality. Thankful
      for the collaborative effort and expertise that has propelled the success
      of "EyeVib."
    </div>
  </div>
)

export default memo(developers)
