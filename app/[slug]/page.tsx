"use client";

import { useEffect, useState } from "react";

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

  if (!clubData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{clubData.club.clubName}</h1>
      <p>{clubData.club.clubDesc}</p>
    </div>
  );
}
