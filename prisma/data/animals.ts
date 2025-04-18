// Define an enum for extinction status with three possible options.
export enum ExtinctionStatus {
  Extinct      = "Extinct",
  Deextincting = "Deextincting",
  NotExtinct   = "NotExtinct",
}

// Define an enum for diet type.
export enum DietType {
  Carnivore = "Carnivore",
  Herbivore = "Herbivore",
  Omnivore  = "Omnivore",
}

// Define the Animal interface with all required fields.
export interface Animal {
  name: string;
  extinctionStatus: ExtinctionStatus;   // Options: "Extinct", "Deextincting", "NotExtinct"
  extinctionDateText: string;            // Descriptive extinction info, e.g., "Approximately 10,000 years ago"
  extinctionYear: number;                // Numeric year, using negative values for BCE (e.g., -4000 for 4000 BCE)
  size: number;                          // Length in meters
  weight: number;                        // Weight in kilograms
  habitat: string;                       // Habitat or region where it lived
  diet: string;                          // Specific dietary details, e.g. "Fruits, seeds" or "Small to medium-sized animals"
  dietType: DietType;                    // General classification: Carnivore, Herbivore, Omnivore
  uniqueTraits: string;                  // A distinctive feature of the animal
  funFacts: string;                      // Engaging tidbits or notable facts
  image: string;                         // The filename of the image asset
}

export const animals: Animal[] = [
  {
    name: "Dodo",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Late 17th century",
    extinctionYear: 1680,
    size: 1.0,
    weight: 13,
    habitat: "Forested regions on Mauritius Island",
    diet: "Fruits, seeds, and possibly small invertebrates",
    // Dodos are generally classified as frugivorous/herbivorous, even if there's evidence of occasional invertebrate consumption.
    dietType: DietType.Herbivore,
    uniqueTraits: "A flightless bird with a unique beak shape",
    funFacts: "Its fearless nature around humans contributed to its rapid decline.",
    image: "dodo.jpg",
  },
  {
    name: "Dire Wolf",
    extinctionStatus: ExtinctionStatus.Deextincting,
    extinctionDateText: "Recently de-extincted via advanced genetic techniques. Previously extinct approximately 12,500 years ago.",
    extinctionYear: -12500,
    size: 1.5,
    weight: 80,
    habitat: "Mixed woodlands and open plains of the Americas during the Pleistocene",
    diet: "Large herbivores such as bison and horses",
    dietType: DietType.Carnivore,
    uniqueTraits: "Robust build and powerful jaws capable of crushing bone",
    funFacts: "Following breakthrough de-extinction efforts using preserved DNA and CRISPR technology, dire wolves have been revived. Early observations suggest they maintain their characteristic pack hunting behavior, offering scientists a unique glimpse into Pleistocene ecology.",
    image: "dire-wolf.webp",
  },
  {
    name: "Saber-Toothed Cat",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Approximately 10,000 years ago",
    extinctionYear: -10000,
    size: 1.2,
    weight: 220,
    habitat: "Forests and open landscapes across North and South America",
    diet: "Large herbivores",
    dietType: DietType.Carnivore,
    uniqueTraits: "Renowned for its long, curved canine teeth",
    funFacts: "Its impressive canines made it one of the most iconic predators despite a relatively moderate bite force.",
    image: "saber-toothed-cat.jpg",
  },
  {
    name: "Short-Faced Bear",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Approximately 12,000 years ago",
    extinctionYear: -12000,
    size: 2.5,
    weight: 900,
    habitat: "Various habitats across North America during the Pleistocene",
    diet: "Omnivorous, consuming both plants and animals",
    dietType: DietType.Omnivore,
    uniqueTraits: "Known for its robust build and unusually short facial structure",
    funFacts: "It was one of the largest terrestrial carnivores of its time.",
    image: "short-faced-bear.webp",
  },
  {
    name: "Tasmanian Tiger",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Early 20th century (last known in 1936)",
    extinctionYear: 1936,
    size: 1.1,
    weight: 30,
    habitat: "Forests and grasslands of Tasmania and mainland Australia",
    diet: "Small to medium-sized animals",
    dietType: DietType.Carnivore,
    uniqueTraits: "Distinctive striped lower back that led to its common name",
    funFacts: "Its unusual appearance has spurred many unconfirmed sightings long after its extinction.",
    image: "tasmanian-tiger.webp",
  },
  {
    name: "Woolly Mammoth",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Approximately 4,000 years ago (in isolated populations)",
    extinctionYear: -4000,
    size: 4.0,
    weight: 6000,
    habitat: "Ice Age steppe-tundra environments across the Northern Hemisphere",
    diet: "Herbivorous, primarily grazing on grasses",
    dietType: DietType.Herbivore,
    uniqueTraits: "Characterized by long, curved tusks and a thick, shaggy coat",
    funFacts: "Woolly Mammoths were highly adapted to cold climates and coexisted with early humans.",
    image: "wooly-mammoth.webp",
  },
  {
    name: "American Mastodon",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Approximately 10,000-11,000 years ago",
    extinctionYear: -10000,
    size: 3.5,
    weight: 4000,
    habitat: "Forests and open woodlands of North America",
    diet: "Browsing on shrubs and trees",
    dietType: DietType.Herbivore,
    uniqueTraits: "Had cone-shaped molars distinct from modern elephants",
    funFacts: "American Mastodons were well adapted to cold climates and had tusks used for digging in snow.",
    image: "american-mastodon.jpg",
  },
  {
    name: "Irish Elk",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Approximately 7,700 years ago",
    extinctionYear: -7700,
    size: 2.5,
    weight: 500,
    habitat: "Open woodlands and marshlands across Europe and Asia",
    diet: "Herbivorous, feeding on grasses and leaves",
    dietType: DietType.Herbivore,
    uniqueTraits: "Famous for its gigantic antlers, which could span up to 3.65 meters",
    funFacts: "Despite its name, the Irish Elk was widespread across Eurasia, not just Ireland.",
    image: "irish-elk.jpg",
  },
  {
    name: "Giant Ground Sloth",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Approximately 10,000 years ago",
    extinctionYear: -10000,
    size: 6.0,
    weight: 4000,
    habitat: "Forests and grasslands of South America",
    diet: "Herbivorous, feeding on leaves and fruits",
    dietType: DietType.Herbivore,
    uniqueTraits: "Notable for its massive claws and slow-moving lifestyle",
    funFacts: "These sloths could reach impressive sizes, making them one of the largest land mammals of their era.",
    image: "giant-ground-sloth.jpg",
  },
  {
    name: "Caribbean Monk Seal",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Mid-20th century (extinct by the 1950s)",
    extinctionYear: 1950,
    size: 2.5,
    weight: 150,
    habitat: "Warm coastal waters and tropical islands in the Caribbean",
    diet: "Fish, squid, and crustaceans",
    dietType: DietType.Carnivore,
    uniqueTraits: "Once abundant in the Caribbean, it suffered from overhunting and habitat loss",
    funFacts: "It is one of the few seal species that inhabited tropical climates.",
    image: "carribean-monk-seal.jpg",
  },
  {
    name: "Glyptodon",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Approximately 10,000 years ago",
    extinctionYear: -10000,
    size: 3.0,
    weight: 2000,
    habitat: "Grasslands of South America",
    diet: "Herbivorous, grazing on low vegetation",
    dietType: DietType.Herbivore,
    uniqueTraits: "Protected by a large, domed, armored shell reminiscent of a giant armadillo",
    funFacts: "Its heavily armored body provided defense against predators.",
    image: "glyptodon.jpg",
  },
  {
    name: "Great Auk",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Mid-19th century (around the 1850s)",
    extinctionYear: 1850,
    size: 1.0,
    weight: 6,
    habitat: "Coastal islands and cliffs in the North Atlantic",
    diet: "Fish and marine invertebrates",
    dietType: DietType.Carnivore,
    uniqueTraits: "A flightless bird that was an excellent swimmer",
    funFacts: "Intense hunting for feathers, oil, and meat led to its extinction.",
    image: "great-auk.jpg",
  },
  {
    name: "Passenger Pigeon",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "Early 20th century (1914)",
    extinctionYear: 1914,
    size: 0.4,
    weight: 0.45,
    habitat: "North American woodlands",
    diet: "Seeds and grains",
    dietType: DietType.Herbivore,
    uniqueTraits: "Formed enormous flocks numbering in the billions",
    funFacts: "Its dramatic extinction is a classic example of the impact of overhunting and habitat destruction.",
    image: "passenger-pigeon.jpg",
  },
  {
    name: "Quagga",
    extinctionStatus: ExtinctionStatus.Extinct,
    extinctionDateText: "1883",
    extinctionYear: 1883,
    size: 1.5,
    weight: 250,
    habitat: "Grasslands and open plains of South Africa",
    diet: "Grazing on grasses",
    dietType: DietType.Herbivore,
    uniqueTraits: "Had a unique pattern with stripes on its front half that faded towards the rear",
    funFacts: "Though a subspecies of zebra, the quagga’s distinct appearance sparked some of the early conservation efforts.",
    image: "quagga.jpg",
  },
]

export default animals
