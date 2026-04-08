export interface Artwork {
  id: string;
  title: string;
  description: string;
  medium: string;
  year: number;
  placeholder: string; // CSS gradient as placeholder until real images are added
  imageUrl?: string;
}

export const galleryData: Artwork[] = [
  {
    id: "1",
    title: "Der schnelle Wolf",
    description: "Scharfer Blick, dynamische und moderne Interpretation",
    medium: "Digital",
    year: 2025,
    placeholder: "linear-gradient(135deg, #38BDF8, #0369A1)",
    imageUrl: "/assets/gallery/Wolf.jpg",
  },
  {
    id: "2",
    title: "Der weise Giraffant",
    description: "Eine surreale Fusion – enorm, sanft und erhaben",
    medium: "Digital",
    year: 2025,
    placeholder: "linear-gradient(135deg, #FB923C, #F472B6)",
    imageUrl: "/assets/gallery/Girrafant.jpg",
  },
  {
    id: "3",
    title: "Tiefer Atemzug",
    description: "Die Ruhe eines tiefen Atemzugs in Farben",
    medium: "Digital",
    year: 2026,
    placeholder: "linear-gradient(135deg, #E0F2FE, #38BDF8)",
  },
  {
    id: "4",
    title: "Sternennacht",
    description: "Tausend Sterne über dem Ozean",
    medium: "Buntstift & Wasserfarben",
    year: 2026,
    placeholder: "linear-gradient(135deg, #164E63, #FBBF24)",
  },
  {
    id: "5",
    title: "Lachende Wellen",
    description: "Wellen, die aussehen als würden sie lachen",
    medium: "Filzstift",
    year: 2025,
    placeholder: "linear-gradient(135deg, #0369A1, #38BDF8)",
  },
  {
    id: "6",
    title: "Wolkenreise",
    description: "Eine Reise durch die Wolken auf dem Rücken einer Makrele",
    medium: "Wasserfarben",
    year: 2026,
    placeholder: "linear-gradient(135deg, #F8FAFC, #F472B6)",
  },
];
