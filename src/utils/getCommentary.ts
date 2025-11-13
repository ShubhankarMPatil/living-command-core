import { commentaryData } from "@/data/commentary";

type Section = keyof typeof commentaryData;

/**
 * Creates a non-repeating shuffler.
 * It cycles through all lines in random order without repetition.
 */
function createShuffler(lines: readonly string[]) {
  let queue: string[] = [];

  function refill() {
    // Always copy (never mutate readonly)
    queue = [...lines];

    // Fisher–Yates shuffle
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
  }

  return function next(): string {
    if (queue.length === 0) refill();
    return queue.pop()!;
  };
}

/**
 * Build shuffler instances for each section.
 */
const shufflers: Record<Section, () => string> = Object.keys(commentaryData).reduce(
  (acc, key) => {
    const section = key as Section;
    acc[section] = createShuffler(commentaryData[section]); // readonly OK now
    return acc;
  },
  {} as Record<Section, () => string>
);

/**
 * Returns a non-repeating, randomly shuffled commentary line for the selected section.
 */
export function getCommentary(section: Section): string {
  return shufflers[section]();
}
