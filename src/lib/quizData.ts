import "server-only";
import type { PublicQuizTrack } from "@/lib/quizTypes";

export const quizTracks = [
  {
    id: "neb",
    category: "neb",
    title: "NEB practice",
    subtitle: "Review sample school-subject concepts",
    mark: "N",
    questions: [
      { prompt: "Which statement describes a vector quantity?", options: ["It has magnitude only", "It has magnitude and direction", "It has direction only", "It has no unit"], answer: 1 },
      { prompt: "What is the pH of a neutral aqueous solution at room temperature?", options: ["0", "5", "7", "14"], answer: 2 },
      { prompt: "Which cell structure contains most of a eukaryotic cell's genetic material?", options: ["Cell membrane", "Nucleus", "Ribosome", "Vacuole"], answer: 1 },
    ],
  },
  {
    id: "cee",
    category: "cee",
    title: "CEE preparation",
    subtitle: "Try sample biology and chemistry questions",
    mark: "C",
    questions: [
      { prompt: "Which organelle is the main site of aerobic respiration?", options: ["Golgi apparatus", "Mitochondrion", "Lysosome", "Chloroplast"], answer: 1 },
      { prompt: "Which molecule carries hereditary information in most living organisms?", options: ["DNA", "Glucose", "Lipid", "Starch"], answer: 0 },
      { prompt: "An enzyme generally speeds up a reaction by lowering its…", options: ["Product concentration", "Activation energy", "Temperature", "Final yield"], answer: 1 },
    ],
  },
  {
    id: "ioe",
    category: "ioe",
    title: "IOE preparation",
    subtitle: "Try sample mathematics and physics questions",
    mark: "I",
    questions: [
      { prompt: "What is the derivative of x² with respect to x?", options: ["x", "2x", "x³", "2"], answer: 1 },
      { prompt: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2 },
      { prompt: "If a fair coin is tossed once, what is the probability of heads?", options: ["0", "1/4", "1/2", "1"], answer: 2 },
    ],
  },
] as const;

export function getPublicQuizTracks(): PublicQuizTrack[] {
  return quizTracks.map(({ id, title, subtitle, mark, questions }) => ({
    id,
    title,
    subtitle,
    mark,
    questions: questions.map(({ prompt, options }) => ({ prompt, options: [...options] })),
  }));
}