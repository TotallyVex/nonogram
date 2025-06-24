import PlayingField from "@/components/playingField";

export default function Home() {
  const data: string[] = [
    "XXXXXOOXXX",
    "XXXXOOXOXX",
    "XXXOOXXOOX",
    "XXOOXXOOXO",
    "XOXOOOOXOO",
    "OOOXOOXOOO",
    "OOOOXOOOOX",
    "XOOOOXOOXX",
    "XXOOOOOXXX",
    "XXXOOOXXXX",
  ];

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col gap-16">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-5xl font-bold">Nonogram</h1>
        <h2 className="text-lg">Puzzle Nr. 1</h2>
      </div>
      <PlayingField puzzle={data} />
    </main>
  );
}
