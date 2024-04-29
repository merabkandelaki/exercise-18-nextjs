import FishesWrapper from "@/components/FishesWrapper/FishesWrapper";
import { getFishes } from "@/services/fishesApi";

export default async function FishesPage() {
  const fishes = await getFishes();
  return fishes.length ? (
    <FishesWrapper fishes={fishes}></FishesWrapper>
  ) : (
    <p>No fishes found</p>
  );
}
