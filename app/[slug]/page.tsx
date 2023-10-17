'use client'


import { useEffect, useState } from 'react';

type PageProps = {
  params: {
    slug: string;
  };
};

export default function ClubPage({ params }: PageProps) {
    const [clubData, setClubData] = useState(null);

    useEffect(() => {
        if (params && params.slug) {
            fetch(`/api/fetchClub?club=${params.slug}`, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => setClubData(data))
                .catch(err => console.error(err));
        }
    }, [params]);

    if (!clubData) return <div>Loading...</div>;

    return (
        <div>
            <h1>{clubData.clubName}</h1>
            <p>{clubData.clubDesc}</p>
        </div>
    );
}
