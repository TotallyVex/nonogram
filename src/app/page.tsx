import PlayingField from "@/components/playingField";

export default function Home() {
  const data = [
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
    <main className="w-screen h-screen flex items-center justify-center">
      <PlayingField data={data} />
    </main>
  );
}
