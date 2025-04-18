import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
// import Image from "next/image";
import aboutUsMainImage from "@/assets/images/aboutUsImage.png"; // Import your image
import aboutImage from "@/assets/images/aboutImage1.png";
import missionImage from "@/assets/images/save_the_world2.jpg";
import SDGTab from "@/components/SDGTabs";
import { Any } from "next-sanity";

const P = ({ children }: { children: Any }) => (
  <p className="py-[1px]">{children}</p>
);

async function About() {
  return (
    <main className="scroll-smooth">
      <Header />
      <div className="relative w-full">
        <div className=" bg-tertiary w-full h-fit relative overflow-hidden">
          {/* golden balls */}
          <div className="absolute -top-[90px] -right-[90px] w-[200px] h-[200px] rounded-full bg-secondary flex justify-center items-center"></div>

          <div className="absolute -bottom-[90px] -left-[90px] w-[200px] h-[200px] rounded-full bg-secondary flex justify-center items-center"></div>

          {/* text and image container */}
          <div className="text-white flex flex-col items-center justify-center w-fit h-full mx-auto relative z-10 py-8">
            {/* container to resize texts and make responsive */}
            <div className="w-full h-fit text-center py-8 px-4">
              <h1 className="mb-4 text-inherit text-[2rem] md:text-[3rem] capitalize font-[600] leading-loose md:leading-snug">
                Be the change you want to see - <br />{" "}
                <span className="text-secondary">Hi Threadies,</span>
              </h1>
              <p className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto text-inherit font-[500] leading-loose">
                <P>
                  Fashion isn’t just about looking good anymore. Well… it can
                  be. And that’s totally fine.
                </P>{" "}
                <P>
                  But it can also mean something more. It can be a force for
                  good. It can feel good and do good.
                </P>{" "}
                <P>That’s what Threadit is all about.</P> 
                <P><strong>Wanna be a part of it?</strong></P>
              </p>
            </div>

            {/* Button */}
            <div className="w-full  xl:w-[40%] text-center py-8 px-4">
              <Link
                href="#our-story"
                className="text-white py-2 px-4 border-white border-[1px] rounded-full w-fit mx-auto hover:bg-white hover:text-[#005A56] transition-all flex items-center gap-2"
              >
                <span className="text-md md:text-lg font-[600]">Read more</span>
              </Link>
            </div>

            {/* Image */}
            {/* <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%]"> */}

            <div
              style={{ backgroundImage: `url(${aboutUsMainImage.src})` }}
              className="w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-contain bg-center bg-no-repeat rounded-xls -mb-8"
            ></div>
            {/* </div> */}
          </div>
        </div>

        {/* Our story section */}
        <div
          id="our-story"
          className=" text-gray-700 py-6 px-4 w-full md:w-[80%] lg:w-[60%] mx-auto container "
        >
          {[
            {
              title: "Our Story",
              subtitle: "Why did we start threadit?",
              text: (
                <div>
                  <P>
                    Threadit started with a simple but essential question:{" "}
                    <i>
                      How can sustainable fashion feel relevant to young people
                      in Africa?
                    </i>
                  </P>
                  <P>
                    Fashion’s footprint is huge. It contributes to climate
                    change, pollution, and unsafe working conditions around the
                    world.
                  </P>
                  <P>
                    In Africa, this impact shows up in unique ways. We see it in
                    the overflow of secondhand clothes in our markets and the
                    limited infrastructure for textile waste and recycling.
                  </P>
                  <P>
                    That’s where Threadit comes in. A platform committed to
                    making sustainability make sense in the context we live,
                    dress, and create in. We explore sustainable fashion through
                    a lens shaped by culture, creativity, and lived experience.
                  </P>

                  <P>
                    Through content, community, and storytelling, we’re bringing
                    sustainability closer to home.
                  </P>
                </div>
              ),
              image: aboutImage,
            },
            {
              title: "Our Mission",
              subtitle:
                "We are on a mission to promote sustainable fashion in Africa",
              text: (
                <div>
                  <P>
                    Our mission is to make sustainable fashion feel relevant,
                    relatable, and rooted in culture and everyday choices.
                  </P>
                  <P>
                    We reshape the fashion narrative in Africa by championing
                    sustainable practices through media, education, and
                    community-driven initiatives.
                  </P>
                  <P>
                    We empower individuals to make informed choices, support
                    ethical brands, and take action toward a more sustainable
                    future.
                  </P>
                </div>
              ),
              image: missionImage,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-8 items-center justify-center ${index === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full md:w-[80%] ld:w-[60%] h-fit mx-auto my-8">
                <h1 className="text-[#005A56] font-[600] text-md uppercase flex items-center gap-4 leading-relaxed">
                  <span className="bg-[#005A56] w-[3rem] h-[2px]"></span>
                  {item.title}
                </h1>
                <h2 className="text-inherit text-[2rem] capitalize font-[600] leading-relaxed">
                  {item.subtitle}
                </h2>
                <p className="text-inherit font-[400] leading-loose text-gray-400">
                  {item.text}
                </p>
              </div>
              <div
                style={{ backgroundImage: `url(${item.image.src})` }}
                className="w-full md:w-1/2 h-[250px] md:h-[450px] lg:h-[500px] bg-contain bg-no-repeat bg-center rounded-xls hidden md:block"
              ></div>
            </div>
          ))}

          {/* SDG Section */}
          <div className="bg-gray-100 py-8">
            <div className="w-full md:w-[90%] lg:w-[60%] h-fit mx-auto my-8">
              <h1 className="text-tertiary font-[600] text-md uppercase flex items-center gap-4 leading-relaxed">
                <span className="bg-tertiary w-[3rem] h-[2px]"></span>
                Our Commitment to The Global Goals
              </h1>
              <h2 className="text-inherit text-[2rem] capitalize font-[600] leading-relaxed">
                Aligning with United Nations SDGs for Greater Impact
              </h2>
              <p className="text-inherit font-[400] leading-loose text-gray-400">
                At Threadit, our work is guided by the United Nations
                Sustainable Development Goals (SDGs)—a global blueprint for a
                better future. As we grow, these goals help shape the stories we
                tell, the communities we support, and the impact we hope to
                make.
              </p>
              <p className="text-inherit font-[400] leading-loose text-gray-400">
                We focus on three key goals:
              </p>

              <Link
                href="https://sdgs.un.org/2030agenda"
                target="_blank"
                className="mt-4 hover:text-tertiary hover:bg-transparent py-2 px-4 border-tertiary border-[1px] rounded-full w-fit bg-tertiary text-white transition-all flex items-center gap-2"
              >
                <span className="text-md md:text-lg font-[600]">
                  2030 Agenda for Sustainable Development
                </span>
              </Link>
            </div>

          </div>
            <SDGTab />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

export default About;