import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";
import type {ReactElement} from 'react';
import type { Series } from '@prisma/client';

import { db } from "~/utils/db.server";

type LoaderData = { series: Series };

export const loader: LoaderFunction = async ({params}) => {
  const data = {
    series: await db.series.findUnique({where: {id:params.seriesId }}),
  } as LoaderData;
  return json(data);
};

export default function SeriesPage(): ReactElement<any> {
    const {series} = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>{series.name}</h1>
      <Outlet />
    </div>
  );
}
