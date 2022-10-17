import {db} from '~/utils/db.server';

export async function getRandomSeries() {
    const group = await db.series.findMany();
    return group[Math.floor(Math.random()*group.length)]
}

export async function getRandomEpisodeOf(id: string) {
    const series = await db.series.findUnique({where: {id}, select: {episodes: true}});
    return series?.episodes[Math.floor(Math.random()*series?.episodes?.length)]
}

// (async function() {
//     const group = await getRandomSeries();
//     return await getRandomEpisodeOf(group);
// })()