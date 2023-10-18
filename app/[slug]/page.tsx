"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Spinner,
  Divider,
  Link,
  User,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";
type PageProps = {
  params: {
    slug: string;
  };
};
interface ClubOfficer {
  name: string;
  position: string;
  email?: string;
}

interface ClubAdvisor {
  name: string;
  email: string;
  phone: string;
  init: string;
}

interface Socials {
  insta: string;
  discord: string;
}

interface Club {
  _id: string;
  clubURL: string;
  clubName: string;
  clubRoom: string;
  clubFrequency: string;
  clubDesc: string;
  clubImage: string;
  clubOfficers: ClubOfficer[];
  clubAdvisor: ClubAdvisor;
  socials: Socials;
  clubCode: string;
  clubLongDesc: string[];
  clubCarousel: string[];
  clubDay: string;
}

interface ClubData {
  club: Club;
}

export default function ClubPage({ params }: PageProps) {
  const [clubData, setClubData] = useState<ClubData | null>(null);

  useEffect(() => {
    if (params && params.slug) {
      fetch(`/api/fetchClub?club=${params.slug}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setClubData(data))
        .catch((err) => console.error(err));
    }
  }, [params]);

  if (!clubData)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="lg" />
          <p className="text-3xl">Loading...</p>
        </div>
      </div>
    );
  const { club } = clubData;
  function getInitials(name: string) {
    const names = name.split(" ");
    const firstInitial = names[0][0] || "";
    const lastInitial = (names.length > 1 ? names[1][0] : "") || "";
    return firstInitial + lastInitial;
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.25,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
    className="flex flex-col items-center space-y-8 p-4 sm:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-4xl font-bold" variants={childVariants}>
        {club.clubName}
      </motion.h1>
      <motion.div variants={childVariants}>
        <Avatar size="lg" src={club.clubImage} alt={club.clubName} />
      </motion.div>
      <div className="text-center space-y-4">
        <p>{club.clubDesc}</p>
        <div className="flex justify-center space-x-2">
          <motion.div variants={childVariants}>
            <Chip color="primary" size="lg" variant="shadow">
              {club.clubFrequency}
            </Chip>
          </motion.div>
          <motion.div variants={childVariants}>
            <Chip color="secondary" size="lg" variant="shadow">
              {club.clubDay}
            </Chip>
          </motion.div>
          <motion.div variants={childVariants}>
            <Chip color="danger" size="lg" variant="shadow">
              {club.clubRoom}
            </Chip>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 w-full">
        <div>
          <motion.h2
            variants={childVariants}
            className="text-2xl font-bold mb-4"
          >
            Advisor
          </motion.h2>
          <motion.div variants={childVariants}>
            <User
              name={club.clubAdvisor.name}
              description={club.clubAdvisor.email}
              avatarProps={{
                fallback: (
                  <FaChalkboardTeacher className="animate-pulse w-6 h-6" />
                ),
              }}
            />
          </motion.div>
          <motion.h2
            variants={childVariants}
            className="text-2xl font-bold my-4"
          >
            Officers
          </motion.h2>
          <div className="flex flex-col items-start space-y-4">
            {club.clubOfficers.map((officer) => (
              <motion.div variants={childVariants}>
                <User
                  key={officer.name}
                  name={officer.name}
                  description={officer.position}
                  avatarProps={{
                    name: getInitials(officer.name),
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          {club.clubLongDesc.map((desc, idx) => (
            <motion.p variants={childVariants} key={idx} className="mb-4">
              {desc}
            </motion.p>
          ))}
        </div>
      </div>
      <motion.h2 variants={childVariants} className="text-2xl font-bold mb-4">
        Socials
      </motion.h2>
      <div className="flex space-x-4">
        {Object.entries(club.socials).map(([key, value]) => (
          <motion.div variants={childVariants} key={key}>
            <Link
              href={
                key === "insta"
                  ? `https://instagram.com/${value.replace("@", "")}`
                  : value.replace("@", "")
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {key === "insta"
                ? value
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </Link>
          </motion.div>
        ))}
      </div>

      <Divider />
    </motion.div>
  );
}
