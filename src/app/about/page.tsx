import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import aboutUsMainImage from "@/assets/images/aboutUsImage.png";
import aboutImage from "@/assets/images/aboutImage1.png";
import missionImage from "@/assets/images/save_the_world2.png";
import SDGTab from "@/components/SDGTabs";
import { Any } from "next-sanity";

const P = ({ children }: { children: Any }) => (
  <p className="py-2 md:py-3">{children}</p>
);

async function About() {
  return (
    <main className="scroll-smooth">
      <Header />
    
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="bg-tertiary w-full relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-[90px] -right-[90px] w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-secondary"></div>
          <div className="absolute -bottom-[90px] -left-[90px] w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-secondary"></div>

          {/* Content container */}
          <div className="text-white flex flex-col items-center justify-center w-full mx-auto relative z-10 md:py-8 px-4 md:px-8">
            {/* Text content */}
            <div className="w-full md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto flex flex-col items-center justify-center">
            <div className="w-full h-fit text-center py-4 md:py-8">
              <h1 className=" md:text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl capitalize font-semibold leading-tight md:leading-snug lg:leading-normal mb-4">
                Be the change you want to see - <br className="hidden sm:block" />
                <span className="text-secondary text-xl sm:text-2xl">Hi Threadies,</span>
              </h1>
              {/* <div className="block md:hidden w-full md:w-[85%] lg:w-[70%] xl:w-[60%] mx-auto text-base sm:text-lg font-medium leading-relaxed space-y-3 text-justify">
                <p className="w-full md:w-[90%] leading-normal "> 
                  {`Fashion isn't just about looking good anymore. Well… it can
                  be. And that's totally fine.              
                  But it can also mean something more. It can be a force for
                  good. It can feel good and do good.
                 That's what Threadit is all about.`}
                <strong>Wanna be a part of it?</strong>
                </p>
              </div> */}

              <div className="w-full sm:w-[60%] py-4  mx-auto text-base sm:text-lg font-medium leading-relaxed space-y-3 text-center">
                <p className="text-inherit">
                 {` Fashion isn't just about looking good anymore. Well… it can
                  be. And that's totally fine.`}
                </p>
                <p className="text-inherit">
                  But it can also mean something more. It can be a force for
                  good. It can feel good and do good.
                </p>
                <p className="text-inherit">{`That's what Threadit is all about.`}</p>
                <p className="text-inherit"><strong>Wanna be a part of it?</strong></p>
              </div>
            </div>

            {/* Button */}
            <div className="w-full sm:w-[80%] lg:w-[50%] xl:w-[40%] md:text-center sm:py-4 md:py-6">
              <Link
                href="#our-story"
                className="text-white py-2 md:py-4 px-6 border-white border rounded-full w-fit mx-auto hover:bg-white hover:text-tertiary transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold">Read more</span>
              </Link>
            </div>
            </div>

            {/* Hero Image */}
            <div
              style={{ backgroundImage: `url(${aboutUsMainImage.src})` }}
              className="w-[250px] sm:w-[350px] md:w-[500px] lg:w-[600px] h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] bg-contain bg-center bg-no-repeat -mb-4 md:-mb-8"
            ></div>
          </div>
        </div>

        {/* Our Story Section */}
        <div
          id="our-story"
          className="text-gray-700 py-8 md:py-12 px-4 sm:px-6 md:px-8 w-full mx-auto container"
        >
          {[
            {
              title: "Our Story",
              subtitle: "Why did we start threadit?",
              text: (
                <div className="space-y-1 md:space-y-2">
                  <P>
                    Threadit started with a simple but essential question:{" "}
                    <i>
                      How can sustainable fashion feel relevant to young people
                      in Africa?
                    </i>
                  </P>
                  <P>
                   {` Fashion's footprint is huge. It contributes to climate
                    change, pollution, and unsafe working conditions around the
                    world.`}
                  </P>
                  <P>
                    In Africa, this impact shows up in unique ways. We see it in
                    the overflow of secondhand clothes in our markets and the
                    limited infrastructure for textile waste and recycling.
                  </P>
                  <P>{`That's where Threadit comes in.`}</P>
                  <P>
                    {`A platform committed to
                    making sustainability make sense in the context we live,
                    dress, and create in. We explore sustainable fashion through
                    a lens shaped by culture, creativity, and lived experience.`}
                  </P>
                  <P>
                    {`Through content, community, and storytelling, we're bringing
                    sustainability closer to home.`}
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
                <div className="space-y-1 md:space-y-2">
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
              className={`flex flex-col ${
                index === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-6 md:gap-8 items-center justify-between mb-12 md:mb-16 lg:mb-20`}
            >
              {/* Text content */}
              <div className="w-full lg:w-1/2 xl:w-[45%] h-fit">
                <h1 className="text-tertiary font-semibold text-sm sm:text-base uppercase flex items-center gap-2 md:gap-4 leading-relaxed mb-2 md:mb-3">
                  <span className="bg-tertiary w-8 sm:w-12 md:w-16 h-[2px]"></span>
                  {item.title}
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl capitalize font-semibold leading-tight md:leading-relaxed mb-3 md:mb-4">
                  {item.subtitle}
                </h2>
                <div className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-gray-600">
                  {item.text}
                </div>
              </div>
              
              {/* Image */}
              <div
                style={{ backgroundImage: `url(${item.image.src})` }}
                className="w-full sm:w-[90%] md:w-[85%] lg:w-[50%] h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] bg-cover bg-no-repeat bg-center rounded-lg mt-4 lg:mt-0"
              ></div>
            </div>
          ))}

          {/* SDG Section */}
          <div className="md:bg-transparent lg:bg-white py-6 sm:py-8 md:py-12 rounded-lg md:shadow-sm">
            <div className="w-full lg:w-[80%] xl:w-[70%] mx-auto">
              <h1 className="text-tertiary font-semibold text-sm sm:text-base uppercase flex items-center gap-2 md:gap-4 leading-relaxed mb-2 md:mb-3">
                <span className="bg-tertiary w-8 sm:w-12 md:w-16 h-[2px]"></span>
                Our Commitment to The Global Goals
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl capitalize font-semibold leading-tight md:leading-relaxed mb-3 md:mb-4">
                Aligning with United Nations SDGs for Greater Impact
              </h2>
              <div className="text-sm sm:text-base md:text-lg font-normal leading-relaxed text-gray-600 space-y-3 md:space-y-4">
                <p>
                  At Threadit, our work is guided by the United Nations
                  Sustainable Development Goals (SDGs) — a global blueprint for a
                  better future. As we grow, these goals help shape the stories we
                  tell, the communities we support, and the impact we hope to make.
                </p>
                <p>
                  We focus on three key goals:
                </p>
              </div>

              <Link
                href="https://sdgs.un.org/2030agenda"
                target="_blank"
                className="mt-6 md:mt-8 hover:text-tertiary hover:bg-transparent py-2 px-4 sm:px-6 border-tertiary border rounded-full w-fit bg-tertiary text-white transition-all duration-300 flex items-center gap-2 text-sm sm:text-base md:text-lg font-semibold"
              >
                2030 Agenda for Sustainable Development
              </Link>
            </div>
            
            {/* SDG Tabs with responsive wrapper */}
            <div className="w-full overflow-x-hidden mt-8">
              <SDGTab />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

export default About;