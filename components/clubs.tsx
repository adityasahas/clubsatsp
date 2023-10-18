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
  const [maxAvatars, setMaxAvatars] = useState<number>(10);
  useEffect(() => {
    const updateMaxAvatars = () => {
      setMaxAvatars(window.innerWidth <= 640 ? 3 : 10);
    };

    updateMaxAvatars();

    window.addEventListener("resize", updateMaxAvatars);

    return () => {
      window.removeEventListener("resize", updateMaxAvatars);
    };
  }, []);
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
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4" key={club._id}>
            <Card
              isPressable
              onClick={() => (window.location.href = `${club.clubURL}`)}
              className="flex flex-col h-full"
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                  src={club.clubImage}
                  alt={club.clubName}
                  className="w-full object-cover rounded-t-lg h-32"
                />
                <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl mt-2">
                  {club.clubName}
                </h4>
              </CardHeader>
              <CardBody className="flex-grow">
                <div className="mb-2">
                  <Chip className="mr-2 my-1" color="primary">
                    {club.clubRoom}
                  </Chip>
                  <Chip className="mr-2 my-1" color="secondary">
                    {club.clubFrequency}
                  </Chip>
                  <Chip className="my-1" color="success">
                    {club.clubDay}s
                  </Chip>
                </div>
                <p className="text-sm sm:text-sm">{club.clubDesc}</p>
              </CardBody>
              <div className="flex flex-col justify-between items-center px-4 py-2">
                <User
                  name={club.clubAdvisor.name}
                  description={club.clubAdvisor.email}
                  avatarProps={{
                    fallback: <FaChalkboardTeacher className=" w-6 h-6" />,
                  }}
                />
                <div className="mt-5 py-4">
                  <AvatarGroup isBordered max={maxAvatars}>
                    {club.clubOfficers.map((officer) => (
                      <Tooltip
                        key={officer.email}
                        content={
                          <div className="px-1 py-2">
                            <div className="text-xs font-bold">
                              {officer.name}
                            </div>
                            <div className="text-xxs">{officer.position}</div>
                          </div>
                        }
                      >
                        <Avatar
                          key={officer.email}
                          name={`${officer.name[0]}${
                            officer.name.split(" ")[1][0]
                          }`}
                          color={getRandomColor(availableColors) || "primary"}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
export default ClubCards;
