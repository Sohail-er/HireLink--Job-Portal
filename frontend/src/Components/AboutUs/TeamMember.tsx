import { Avatar, Button, Card, Group, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

const teamMembers = [
    {
        id: 1,
        name: "Sohail Khan",
        role: "Full Stack Developer & Project Lead",
        photo: "/team/photo.jpg",
        bio: "Passionate full-stack developer with expertise in React, Spring Boot, and system architecture. Leads the development team with a focus on clean code and user experience.",
        skills: ["React", "Spring Boot", "MySQL", "System Design"],
        github: "https://github.com/Sohail-er",
        linkedin: "https://linkedin.com/in/sohail-ahmed",
        email: "sohail@hirelink.com"
    },
    {
        id: 2,
        name: "Irteza Khan",
        role: "Backend Developer & Team Member",
        photo: "/team/irteza.jpg",
        bio: "Creative frontend developer specializing in modern React applications and responsive design. Passionate about creating intuitive user interfaces.",
        skills: ["React", "TypeScript", "Tailwind CSS", "UI/UX"],
        github: "https://github.com/priya-sharma",
        linkedin: "https://linkedin.com/in/priya-sharma",
        email: "priya@hirelink.com"
    },
    {
        id: 3,
        name: "Kalyani Tonchar",
        role: "Frontend Developer &Team Member",
        photo: "/team/kalyani.jpg",
        bio: "Experienced backend developer with strong expertise in Java, Spring Boot, and database optimization. Ensures robust and scalable server-side solutions.",
        skills: ["Java", "Spring Boot", "PostgreSQL", "Microservices"],
        github: "https://github.com/rajesh-kumar",
        linkedin: "https://linkedin.com/in/rajesh-kumar",
        email: "rajesh@hirelink.com"
    },
    {
        id: 4,
        name: "Pooja Nalawade",
        role: "Developer & Team Member",
        photo: "/team/pooja.jpg",
        bio: "Creative UI/UX designer focused on user-centered design principles. Creates beautiful and functional interfaces that enhance user experience.",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        github: "https://github.com/anita-desai",
        linkedin: "https://linkedin.com/in/anita-desai",
        email: "anita@hirelink.com"
    },
    {
        id: 5,
        name: "Mihir Tijare",
        role: "Operations Manager & Team Member",
        photo: "/team/mihir.jpg",
        bio: "DevOps specialist ensuring smooth deployment and infrastructure management. Passionate about automation, monitoring, and system reliability.",
        skills: ["Docker", "AWS", "Jenkins", "Kubernetes"],
        github: "https://github.com/vikram-singh",
        linkedin: "https://linkedin.com/in/vikram-singh",
        email: "vikram@hirelink.com"
    }
];

const TeamMember = () => {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-8 max-w-7xl">
                {teamMembers.map((member, index) => (
                    <Card
                        key={member.id}
                        className="w-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                    >
                        <div className="p-6 text-center">
                            <Avatar
                                src={member.photo}
                                alt={member.name}
                                size={90}
                                className="mx-auto mb-4 border-4 border-gray-100 shadow-lg"
                                styles={{
                                    root: { backgroundColor: '#f3f4f6' }
                                }}
                            />
                            <Text className="text-gray-800 font-bold text-lg mb-2">{member.name}</Text>
                            <Text className="text-gray-600 text-sm font-medium leading-tight">{member.role}</Text>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TeamMember;
