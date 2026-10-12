import { loadAndValidate } from "./validate";
import { CLIPPED_TITLE_RE } from "./lib";

const { pathways } = loadAndValidate();
for (const p of pathways) {
  for (const [grade, block] of Object.entries(p.gradeBlocks)) {
    for (const u of block.units)
      for (const c of u.chapters) {
        if (CLIPPED_TITLE_RE.test(c.title))
          console.log("CHAPTER", p.pathway, grade, u.key, c.sourceNumber, "::", c.title);
        for (const t of c.topics)
          if (CLIPPED_TITLE_RE.test(t.title))
            console.log("TOPIC", p.pathway, grade, u.key, c.sourceNumber, t.sourceNumber, "::", t.title);
      }
  }
}
