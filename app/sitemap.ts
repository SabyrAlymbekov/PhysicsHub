import { db } from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const olympiads = await db.olympiad.findMany({});
    const materials = await db.textbook.findMany({});
    const profiles = await db.user.findMany({});

    const olympiadEntries: MetadataRoute.Sitemap = olympiads.map(olympiad => ({
        url: `${process.env.NEXT_PUBLIC_URL}/olympiads/${olympiad.id}`,
        lastModified: olympiad.updatedAt,
        changeFrequency: "monthly",
    }));

    const materialEntries: MetadataRoute.Sitemap = materials.map(material => ({
        url: `${process.env.NEXT_PUBLIC_URL}/materials/${material.id}`,
        lastModified: material.updatedAt,
        changeFrequency: "monthly",
    }));

    const profileEntries: MetadataRoute.Sitemap = profiles.map(profile => ({
        url: `${process.env.NEXT_PUBLIC_URL}/profile/${profile.id}`,
        lastModified: profile.updatedAt,
        changeFrequency: "monthly",
    }));

    return [
        {
            url: `${process.env.NEXT_PUBLIC_URL}/`,
            lastModified: new Date(),
            changeFrequency: "yearly",
        },
        {
            url: `${process.env.NEXT_PUBLIC_URL}/materials`,
            lastModified: new Date(),
            changeFrequency: "monthly",
        },
        {
            url: `${process.env.NEXT_PUBLIC_URL}/olympiads`,
            lastModified: new Date(),
            changeFrequency: "monthly",
        },
        {
            url: `${process.env.NEXT_PUBLIC_URL}/team`,
            lastModified: new Date(),
            changeFrequency: "yearly",
        },
        {
            url: `${process.env.NEXT_PUBLIC_URL}/shop`,
            lastModified: new Date(),
            changeFrequency: "yearly",
        },
        ...olympiadEntries,
        ...materialEntries,
        ...profileEntries
    ]
}