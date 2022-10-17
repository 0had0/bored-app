import { useFetcher } from '@remix-run/react';
import { json } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";
import type {ReactElement} from 'react';

import { getRandomEpisodeOf } from '~/models/random.server';

type LoaderData = { episode: string };

export const loader: LoaderFunction = async ({params}) => {
  const data = {
    episode: await getRandomEpisodeOf(params.seriesId as string),
  } as LoaderData;
  return json(data);
};

export default function SeriesPage(): ReactElement<any> {
    const fetcher = useFetcher();
    const handleClick = () => {
        // @ts-ignore
        fetcher.submit()
    }
    
  return (
    <div>
        <button onClick={handleClick}>give me an episode!</button>
        <br></br>
        {fetcher?.data?.episode ?? ' '}
    </div>
  );
}
