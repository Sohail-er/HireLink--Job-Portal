import { Carousel } from "@mantine/carousel";
import { jobCategory } from "../../Data/Data";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const JobCategory = () => {
    return <div className="mt-20 pb-5 overflow-hidden">
        <div data-aos="zoom-out" className="text-4xl  text-center font-semibold  md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl mb-3 text-gray-800">Browse <span className="text-purple-600">Job </span>
            Category</div>
        <div data-aos="zoom-out" className="text-lg sm-mx:text-base xs-mx:text-sm mb-10 mx-auto text-gray-600 text-center w-1/2 sm-mx:w-11/12">Explore diverse job opportunities tailored to your skills. Start your career journey today!</div>
        <Carousel slideSize="22%" slideGap="md" loop className="focus-visible:[&_button]:!outline-none
        [&_button]:!bg-gradient-to-r [&_button]:!from-purple-500 [&_button]:!to-pink-500 [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100 
        "
        nextControlIcon={<IconArrowRight className="h-8 w-8" />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
  
        >
            {
                jobCategory.map((category, index) => <Carousel.Slide key={index}>
                    <div data-aos="zoom-out" className="flex flex-col items-center w-64 sm-mx:w-56 xs-mx:w-48 gap-2 border border-purple-300 bg-white/80 backdrop-blur-sm p-5 rounded-xl hover:cursor-pointer hover:shadow-lg hover:shadow-purple-200 my-5 transition duration-300 ease-in-out">
                        <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                            <img className="h-8 w-8 sm-mx:h-6 sm-mx:w-6 xs-mx:h-4 xs-mx:w-4" src={`/Category/${category.name}.png`} alt={category.name} />
                        </div>
                        <div className="text-gray-800 text-xl sm-mx:text-lg xs-mx:text-base font-semibold">{category.name}</div>
                        <div className="text-sm xs-mx:text-xs  text-center text-gray-600">{category.desc}</div>
                        <div className="text-purple-600 text-lg sm-mx:text-base xs-mx:text-sm font-semibold">{category.jobs}+ new job posted</div>
                    </div>
                </Carousel.Slide>)
            }
        </Carousel>

    </div>
}
export default JobCategory;