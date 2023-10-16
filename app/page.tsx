import { Button } from "@nextui-org/button";
import { title, subtitle } from "@/components/primitives";
import { AiOutlineArrowDown } from "react-icons/ai";
import ClubCards from "@/components/clubs";
export default function Home() {
  return (
    <div>
      <section className="flex h-screen flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Sierra Pacific High School&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>clubs&nbsp;</h1>
          <br />

          <h2 className={subtitle({ class: "mt-4" })}>
            check out the clubs at sierra pacific
          </h2>
          <br />
          <Button className="bg-gradient-to-tr from-pink-500 to-violet-500 text-white shadow-lg">
            scroll down <AiOutlineArrowDown />{" "}
          </Button>
        </div>
      </section>
	  <ClubCards/>
    </div>
  );
}
