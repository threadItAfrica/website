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
      <div className="max-w-[2024px] mx-auto">
        <Hero />
        <RecentPosts /> 
      </div>
        <Categories />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
