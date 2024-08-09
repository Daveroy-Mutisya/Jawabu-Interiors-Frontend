import React from 'react'
import ProjectCarousel from './ProjectCarousel';
import ProjectCarousel2 from './ProjectCarousel2';
import ProjectCarousel3 from './ProjectCarousel3';
import RedirectButton from './RedirectButton';
import { useMediaQuery } from 'react-responsive'

const Philosophy = () => {
  return (
    <div>
      <div className="px-4 py-8">
  <h3 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight text-green-600 text-center">
    Our Philosophy
  </h3>
  <h2 className="scroll-m-20 border-b pb-2 text-4xl sm:text-5xl font-semibold tracking-tight mt-4 text-center leading-tight">
    It's not about ideas. It's about making ideas happen
  </h2>
  <p className="text-lg sm:text-2xl text-muted-foreground text-center mt-4 leading-snug">
    Our commitment to quality and services ensures our clients are happy. We're
    happy to make you feel comfortable in your own home.
  </p>
</div>

        <div className="flex justify-center w-full my-10">
          <div className="flex flex-col items-center mx-14">
            <ProjectCarousel />
          </div>
          {/* <div className="flex flex-col items-center mx-14">
            <ProjectCarousel2 />
          </div> */}
          {/* <div className="flex flex-col items-center mx-14">
            <ProjectCarousel3 />
          </div> */}
        </div>
    </div>
  )
}

export default Philosophy
