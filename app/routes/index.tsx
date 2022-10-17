import type { Series, Episode } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import type { ReactElement } from "react";
import {json} from '@remix-run/node';
import { Link, useFetcher } from "@remix-run/react";
import { getRandomSeries, getRandomEpisodeOf } from "~/models/random.server";

type LoaderData = { series: Series, episode: Episode };

export const loader: LoaderFunction = async () => {
  const series = await getRandomSeries();
  const data = {
    series,
    episode:await getRandomEpisodeOf(series.id as string),
  } as LoaderData;
  return json(data);
};

function Poster({series, episode}: LoaderData): ReactElement<LoaderData> {
  return (
    <div>
      <div style={{height: 200}}>
        <img src={series?.image_thumbnail_path} style={{maxHeight: '200px'}} height="10%" width="auto" alt={series?.name} />
      </div>
      <p>{episode?.id}</p>
      <h3>{episode?.name ?? ' '}</h3>
      <p>{episode?.air_date?.split(' ')[0]}</p>
    </div>
  )
}

export default function Index() {
  const fetcher = useFetcher();

  const handleClick = () => {
        // @ts-ignore
        fetcher.submit()
      }
  
  return (
    <div className="container min-w-full min-h-screen flex flex-col justify-center items-center">
      <div style={{minHeight: '80vh'}} className="container max-w-sm flex flex-col items-center justify-between">
        <h1 className="text-7xl ">How much bored you are?</h1>
        <div className="flex-grow flex items-end py-6">
          <Poster {...fetcher.data} />
        </div>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-indigo-900 rounded shadow" onClick={handleClick}>
            Give me Something to Watch
        </button>
        
          <Link className="font-semibold bg-indigo-400 hover:bg-opacity-50 bg-opacity-30 py-2 px-5 text-indigo-600 hover:text-white rounded-lg mt-5 border border-indigo-400 shadow" to='/series'>
            Series list
          </Link>
        
      </div>
    </div>
  );
}
