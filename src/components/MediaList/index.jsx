import { useEffect, useState } from 'react';
import MovieCard from '@components/MovieCard';

const MediaList = ({ title, tabs }) => {
    const [mediaList, setMediaList] = useState([]);
    const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

    useEffect(() => {
        const url = tabs.find(tab => tab.id === activeTabId)?.url;
        if (url) {
            fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE3ODRiMDJjYzYzY2VmYWY1MzQ5YTVhZGE5NGQzZiIsIm5iZiI6MTc1NTU3ODQ1Mi43OTYsInN1YiI6IjY4YTQwMDU0YzUwMGJmYTM3MTE3ZDI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8B90BWYv6IGJLKt713PDR0Wn3Q9IgwEahjo1uQEUWSg',
                },
            })
                .then(res => res.json())
                .then(data => {
                    const trendingMediaList = data.results.slice(0, 12);
                    setMediaList(trendingMediaList);
                });
        }
    }, [activeTabId, tabs]);

    return (
        <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
            <div className="mb-6 flex items-center gap-4">
                <p className="text-[2vw] font-bold">{title}</p>
                <ul className="flex rounded border border-white">
                    {tabs.map(tab => (
                        <li
                            key={tab.id}
                            className={`cursor-pointer rounded px-2 py-1 ${tab.id === activeTabId ? 'bg-white text-black' : ''}`}
                            onClick={() => setActiveTabId(tab.id)}
                        >
                            {tab.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
                {mediaList.map(media => (
                    <MovieCard
                        id={media.id}
                        key={media.id}
                        title={media.title || media.name}
                        releaseDate={media.release_date || media.first_air_date}
                        poster={media.poster_path}
                        point={media.vote_average}
                        mediaType={media.media_type || activeTabId}
                    />
                ))}
            </div>
        </div>
    );
};
export default MediaList;
