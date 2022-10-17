import { PrismaClient } from "@prisma/client";
import axios from "axios";
const db = new PrismaClient();

async function seed() {
  async function getSeries() {
    const SLUGS = [
        'brooklyn-nine-nine',
        'rick-and-morty',
        'modern-family',
        'the-office-us'
      ] 
    const results = await Promise.all(SLUGS.map(async (slug) => {
      try {
            const res = await axios.get(`https://www.episodate.com/api/show-details?q=${slug}`);
            return res.data;
        } catch (message) {
            return console.error(message);
        }
    }))
    return results
  }

  const data = await getSeries()

  for(let i=0;i<data.length;i++) {
    const series = data[i];
    const episodes = series.tvShow.episodes
    const pictures = series.tvShow.pictures

    for(let j=0;j<episodes.length;j++) {
      const ep = episodes[j]
      await db.episode.create({ 
        data: {
          id: `${series.tvShow.name} s${ep.season}e${ep.episode}`,
          series: {
            connectOrCreate: {
              create: {
                id: series.tvShow.permalink,
                name: series.tvShow.name,
                image_path: series.tvShow.image_path,
                image_thumbnail_path: series.tvShow.image_thumbnail_path,
              },
              where: {
                id: series.tvShow.permalink
              }
            }
          },
          ...ep,
        },
        })
      if (j < pictures.length) {
        await db.images.create({
          data: {
            link: pictures[j],
            series: {
              connectOrCreate: {
                create: {
                  id: series.tvShow.permalink,
                  name: series.tvShow.name,
                  image_path: series.tvShow.image_path,
                  image_thumbnail_path: series.tvShow.image_thumbnail_path,
                },
                where: {
                  id: series.tvShow.permalink
                }
              }
            }
          }
        })
      }
    }
  }
}

seed();