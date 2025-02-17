import { PianoGrid } from "@/components/PianoGrid";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Piano Soundboard
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Tap the squares to play different piano notes
          </p>
          <PianoGrid />
        </CardContent>
      </Card>
    </div>
  );
}
