import Head from 'next/head'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from '../axios'
import JokeCard from '../components/JokeCard'

interface CoolObj {
    categories: string[]
    created_at: string
    icon_url: string
    id: string
    updated_at: string
    url: string
    value: string
}

const Home = () => {
    const [jokes, setJokes] = useState<CoolObj[]>([])

    let api: any = []

    //Fetch data from Chuck API

    const fetchData = () => {
        axios
            .get('/jokes/random')
            .then((res) => {
                api.push(res.data)
                setJokes((prevJokes) => {
                    return [...new Set([...prevJokes, ...api.map((i) => i)])]
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    //Make ten request to Chuck API

    const fetchTenJokes = () => {
        for (let index = 0; index < 10; index++) {
            fetchData()
        }
    }

    useEffect(() => {
        fetchTenJokes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="bg-[#121212] text-gray-200 py-12 min-h-screen">
            <Head>
                <title>Chuck Norris Jokes</title>
            </Head>

            <InfiniteScroll
                dataLength={jokes.length}
                next={fetchTenJokes}
                hasMore={true}
                loader={
                    <div className="flex justify-center text-center">
                        <h4>Loading...</h4>
                    </div>
                }
                endMessage={
                    <div className="flex justify-center text-center">
                        <p>
                            <b>Yay! You have seen it all</b>
                        </p>
                    </div>
                }
            >
                <div className="flex flex-col items-center space-y-4">
                    {jokes.map((item) => (
                        <div key={item.id}>
                            <JokeCard text={item.value} img={item.icon_url} />
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Home
