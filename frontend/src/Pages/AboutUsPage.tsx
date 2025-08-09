import TeamMember from "../Components/AboutUs/TeamMember";

const AboutUsPage = () => {
    return (
        <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-['poppins']">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        About Us
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We are a passionate team committed to revolutionizing the job search experience.
                    </p>
                </div>

                {/* Team Section */}
                <div className="text-center mb-10" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                    <p className="text-xl text-gray-600">
                        The brilliant minds behind HireLink
                    </p>
                </div>

                <TeamMember />
            </div>
        </div>
    );
};

export default AboutUsPage;
