import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client } from "@/sanity/client"; // Import your Sanity client
import { Category } from "@/utils/interface";
import Link from "next/link";

async function About() {
  // Fetch categories from Sanity
  const categories: Category[] = await client.fetch(
    `*[_type == "category"]|order(_createdAt asc){
        _id,
        title,
        description,
        slug
      }`
  );

  return (
    <main>
      <Header />
      <div className="mt-[5rem] md:mt-[10rem] w-full md:w-[80%] mx-auto  max-w-[2024px] container p-4">
        {/* About Us Section */}
        <div className=" mx-auto md:min-h-[60vh] flex flex-col lg:flex-row justify-center items-center">
          {/*  <div className="lg:w-1/2 h-[80vh] bg-cover bg-no-repeat bg-center rounded-lg mb-8 lg:mb-0"></div> */}

          <div className="w-full lg:w-1/2 md:text-center">
            <h1 className="text-lg md:text-2xl font-[600] mb-4 border-b-[1px] border-gray-500">
              About Us
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Welcome to Thread It, your go-to blog for the latest trends in
              fashion, sustainability, and eco-friendly living. Our mission is
              to inspire and educate our readers on how to make conscious
              choices that positively impact the world.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              At Thread It, we believe that fashion can be both stylish and
              sustainable. We are dedicated to bringing you the best in
              eco-friendly fashion, sustainable living tips, and the latest
              trends in the industry.
            </p>
            <p className="text-lg text-gray-700">
              Join us on our journey to make the world a better place, one
              thread at a time.
            </p>
          </div>
        </div>

        {/* Brand Vision Section */}
        <div className="flex flex-col-reverse lg:flex-row-reverse justify-center items-center my-4">
          <div className="w-full lg:w-1/2 text-gray-900 rounded-lg my-8 lg:ml-8">
            <h2 className="text-lg md:text-2xl font-[600] mb-4 border-b-[1px] border-gray-500 text-secondary">
              Brand Vision
            </h2>
            <p className="text-lg mb-4">
              To be the leading voice shaping the future of sustainable fashion
              in Africa. We aim to become an impact-driven media platform that
              promotes mindful fashion consumption while uplifting local
              designers and fostering community engagement. Thank you for being
              a part of our journey. Together, we can make a difference.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] border bg-[url('../assets/images/save_the_world.jpg')] bg-contain bg-no-repeat bg-center rounded-lg"></div>
        </div>

        {/* Brand Mission Section */}
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center mb-16">
          <div className="w-full md:w-1/2 text-gray-900 rounded-lg my-8 lg:mr-8">
            <h2 className="text-lg md:text-2xl font-[600] mb-4 border-b-[1px] border-gray-500 text-secondary">
              Brand Mission
            </h2>
            <p className="text-lg mb-4">
              Our mission is to reshape Africa’s fashion narrative by
              championing sustainable practices through media, education, and
              community-driven initiatives.
            </p>
            <p className="text-lg">
              We empower individuals to make informed choices, support ethical
              brands, and take action toward a more sustainable future.
            </p>
            <p className="text-lg">
              We believe every small choice drives big change, starting with
              awareness and leading to action.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-[40vh] md:h-[50vh] border bg-[url('../assets/images/africa.jpeg')] bg-contain bg-no-repeat bg-center rounded-lg"></div>
        </div>

        {/* Blog Sections Explanation */}
        <div className="flex flex-col justify-center items-center my-16 lg:min-h-[80vh]">
          <h2 className="text-lg md:text-2xl  font-[600] mb-8 text-secondary">
            Our Blog Sections
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((category) => (
              <div
                key={category._id}
                className="p-6  rounded-lg shadow-lg max-w-[500px]"
              >
                <h3 className="text-lg md:text-xl font-[500] mb-4 text-gray-900">
                  {category.title}
                </h3>
                <p className="text-lg text-gray-700 my-8">
                  {category.description}
                </p>

                <Link
                  href={`/postList/${category.slug.current}`}
                  className=" bg-secondary rounded-md px-4 py-2 text-white"
                >
                  Read Articles
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default About;
