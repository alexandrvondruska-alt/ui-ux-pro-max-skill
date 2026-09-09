import Hero from "@/components/Hero";
import ValueMarquee from "@/components/ValueMarquee";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import Booking from "@/components/Booking";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueMarquee />
      <About />
      <Gallery />
      <Amenities />
      <Booking />
      <Reviews />
      <Location />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
