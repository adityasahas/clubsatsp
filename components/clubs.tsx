"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Avatar,
  AvatarGroup,
  Image,
  User,
  Tooltip,
} from "@nextui-org/react";
import { FaChalkboardTeacher } from "react-icons/fa";
interface Club {
  _id: string;
  clubURL: string;
  clubName: string;
  clubRoom: string;
  clubFrequency: string;
  clubDay: string;
  clubDesc: string;
  clubImage: string;
  clubOfficers: Officer[];
  clubAdvisor: Advisor;
  socials: Socials;
  clubCode: string;
  clubLongDesc: string[];
  clubCarousel: string[];
}

interface Officer {
  name: string;
  position: string;
  email: string;
  chessUsername?: string;
}

interface Advisor {
  email: string;
  name: string;
  init: string;
  phone: string;
}

interface Socials {
  insta: string;
  discord?: string;
}

const ClubCards: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseColors: (
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
  )[] = ["primary", "secondary", "success", "warning", "danger"];

  const getRandomColor = (
    availableColors: typeof baseColors
  ): (typeof baseColors)[number] => {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const chosenColor = availableColors[randomIndex];
    availableColors.splice(randomIndex, 1);
    return chosenColor;
  };
  useEffect(() => {
    fetch("/api/fetchClubs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }
        return response.json();
      })
      .then((data) => {
        setClubs(data.clubs);
        setLoading(false);
      })

      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-wrap -mx-2">
      {clubs.map((club) => {
        const availableColors = [...baseColors];
        return (
          <div className="w-full lg:w-1/2 px-2 mb-4" key={club._id}>
            <Card className="flex flex-col h-full">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                  src={club.clubImage}
                  alt={club.clubName}
                  className="w-full object-cover rounded-t-lg h-32"
                />
                <h4 className="font-bold text-3xl mt-2">{club.clubName}</h4>
              </CardHeader>
              <CardBody className="flex-grow">
                <div className="mb-2">
                  <Chip className="mr-2" color="primary">
                    {club.clubRoom}
                  </Chip>
                  <Chip className="mr-2" color="secondary">
                    {club.clubFrequency}
                  </Chip>
                  <Chip color="success">{club.clubDay}s</Chip>
                </div>
                <p className="text-sm">{club.clubDesc}</p>
              </CardBody>
              <div className="flex justify-between items-center px-4 py-2">
                <User
                  name={club.clubAdvisor.name}
                  description={club.clubAdvisor.email}
                  avatarProps={{
                    fallback: (
                      <FaChalkboardTeacher className="animate-pulse w-6 h-6" />
                    ),
                  }}
                />

                <AvatarGroup isBordered>
                  {club.clubOfficers.map((officer) => (
                    <Tooltip
                        key={officer.email}
                      content={
                        <div className="px-1 py-2">
                          <div className="text-small font-bold">
                            {officer.name}
                          </div>
                          <div className="text-tiny">{officer.position}</div>
                        </div>
                      }
                    >
                      <Avatar
                        key={officer.email}
                        name={`${officer.name[0]}${
                          officer.name.split(" ")[1][0]
                        }`}
                        color={getRandomColor(availableColors)}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ClubCards;
