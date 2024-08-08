import { NavBar } from "@/components/NavBar";
import FeaturesSection from "@/components/Features";
import ProcessSection from "@/components/Process";
import LandingSection from "@/components/Landing";
import Philosophy from "@/components/Philosophy";


export default function Home() {
  return (
    <>
    {/* NavBar */}
      <div className="">
        <div>
          <NavBar />
        </div>
      </div>
      {/* Home-Page-Section 1 */}
      {/* <section className="relative h-screen flex flex-col gap-2 justify-center items-center">
        < LandingSection />
      </section> */}
      {/* Home-Page-Section 2 */}
      {/* <section className="relative h-screen flex flex-col justify-center items-center">
        < Philosophy />
      </section> */}
      {/* Home-Page-Section 3 */}
      {/* <section className="relative h-screen flex flex-col justify-center items-center">
        <FeaturesSection/>
      </section> */}
      {/* Home-Page-Section 4 */}
      {/* <section className="relative h-screen ">
        <ProcessSection />
      </section> */}
    </>
  );
}
