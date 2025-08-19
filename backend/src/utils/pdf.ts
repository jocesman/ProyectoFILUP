// src/utils/pdf.ts
import PDFDocument from "pdfkit";
import { Response } from "express";
import axios from "axios";

type PokeDetail = { name: string; abilities: string[]; image: string };

export async function createPokemonsPDF(list: PokeDetail[], res: Response) {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  doc.fontSize(18).text("Pokedex", { align: "center" });
  doc.moveDown();

  for (const p of list) {
    doc.fontSize(14).text(capitalize(p.name), { continued: false });
    doc.fontSize(10).text(`Habilidades: ${p.abilities.join(", ") || "N/D"}`);
    if (p.image) {
      try {
        const img = await axios.get(p.image, { responseType: "arraybuffer" });
        doc.image(Buffer.from(img.data), { width: 120, fit: [120, 120] });
      } catch {}
    }
    doc.moveDown();
    doc.moveDown();
  }

  doc.end();
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
