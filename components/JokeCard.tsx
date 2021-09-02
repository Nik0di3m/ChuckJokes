import Image from 'next/image'

interface CoolProps {
    text: string
    img: string
}

const JokeCard = ({ text, img }: CoolProps) => {
    return (
        <div className="border rounded-xl flex flex-col h-auto w-60 p-4 break-words shadow-lg">
            <div>
                <Image
                    src={img}
                    alt="Chuck Norris Joke"
                    width={50}
                    height={50}
                />
            </div>
            <div className="text-lg">{text}</div>
        </div>
    )
}

export default JokeCard
