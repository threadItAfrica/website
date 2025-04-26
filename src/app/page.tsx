import Hero from "@/sections/Hero";
import { NewsletterSection } from "@/sections/NewsletterSection";


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RecentPosts } from "@/sections/RecentPosts";
import Categories from "../sections/categories";

export default function Home() {
  return (
    <main>
      <Header />
      <div className=" bg-tertiary">
        <Hero />
      </div>
        <RecentPosts /> 
        <Categories />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
