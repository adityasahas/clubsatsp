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
  );  const { club } = clubData;
  function getInitials(name: string) {
    const names = name.split(" ");
    const firstInitial = names[0][0] || "";
    const lastInitial = (names.length > 1 ? names[1][0] : "") || "";
    return firstInitial + lastInitial;
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <h1 className="text-4xl font-bold">{club.clubName}</h1>
      <Avatar size="lg" src={club.clubImage} alt={club.clubName} />
      <div className="text-center space-y-4">
        <p>{club.clubDesc}</p>
        <div className="flex justify-center space-x-2">
          <Chip color="primary" size="lg" variant="shadow">
            {club.clubFrequency}
          </Chip>
          <Chip color="secondary" size="lg" variant="shadow">
            {club.clubDay}
          </Chip>
          <Chip color="danger" size="lg" variant="shadow">
            {club.clubRoom}
          </Chip>
        </div>
      </div>
      <div className="flex space-x-8 w-full">
        <div>
          <h2 className="text-2xl font-bold mb-4">Advisor</h2>
          <User
            name={club.clubAdvisor.name}
            description={club.clubAdvisor.email}
            avatarProps={{
              fallback: (
                <FaChalkboardTeacher className="animate-pulse w-6 h-6" />
              ),
            }}
          />
          <h2 className="text-2xl font-bold my-4">Officers</h2>
          <div className="flex flex-col items-start space-y-4">
            {club.clubOfficers.map((officer) => (
              <User
                key={officer.name}
                name={officer.name}
                description={officer.position}
                avatarProps={{
                  name: getInitials(officer.name),
                }}
              />
            ))}
          </div>
        </div>
        <div>
          {club.clubLongDesc.map((desc, idx) => (
            <p key={idx} className="mb-4">
              {desc}
            </p>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        {Object.entries(club.socials).map(([key, value]) => (
          <Link
            href={key === "insta" ? `https://instagram.com/${value}` : value}
            target="_blank"
            rel="noopener noreferrer"
            key={key}
          >
            <Button color="primary">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          </Link>
        ))}
      </div>
      <Divider />
    </div>
  );
}
