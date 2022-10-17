import { Link, useLoaderData } from '@remix-run/react';
import { json } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";
import type { Series } from '@prisma/client';

import { db } from "~/utils/db.server";

type LoaderData = { series: Series[]};

export const loader: LoaderFunction = async () => {
  const data = {
    series: await db.series.findMany(),
  } as LoaderData;
  return json(data);
};
export default function SeriesPage() {
    const {series} = useLoaderData() as LoaderData;
    return (
        <ul>
            {series.map((s) => <li key={s.id}><Link to={`/series/${s.id}`}>{s.name}</Link></li>)}
        </ul>
    )
}