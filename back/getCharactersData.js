import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// URL da página
const url = "https://wiki.gla.com.br/index.php/Personagens";

// Caminho do arquivo de saída
const directoryPath = "C:/Users/nicho/OneDrive/Documentos/Projects/gla/data";
const filePath = path.join(directoryPath, "charactersData.json");

const CHARACTERS_CONTAINER =
  "#content #bodyContent #mw-content-text .mw-parser-output #characters-container";

const extractCharacters = async () => {
  try {
    console.log("🚀 Abrindo navegador headless...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log("🔍 Carregando página de personagens...");
    await page.goto(url, { waitUntil: "networkidle2" });

    // Espera alguns segundos pra garantir que os scripts do site rodem
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Salva o HTML atual pra você inspecionar
    const html = await page.content();
    fs.writeFileSync("page_dump.html", html);
    console.log(
      "📄 HTML salvo como page_dump.html — abra e veja se existe #character-container"
    );

    // Espera o container aparecer
    await page.waitForSelector(CHARACTERS_CONTAINER, { timeout: 20000 });

    const data = await page.evaluate((containerSelector) => {
      const container = document.querySelector(containerSelector);
      if (!container) return [];

      const characters = container.querySelectorAll(".characters");
      const tiers = ["diamond", "gold", "silver", "bronze"];
      const results = [];

      characters.forEach((el) => {
        const name = el.id.replace(/_/g, " ");
        const attributes = Array.from(el.attributes)
          .filter((a) => a.name.startsWith("data-type-"))
          .map((a) => a.name.replace("data-type-", ""));
        const tier = attributes.find((a) => tiers.includes(a)) || "unknown";
        const classes = attributes.filter((a) => !tiers.includes(a));

        results.push({ name, class: classes, tier });
      });

      return results;
    }, CHARACTERS_CONTAINER);

    await browser.close();

    // Ordena e adiciona metadados
    data.sort((a, b) => a.name.localeCompare(b.name));
    const finalData = {
      lastUpdated: new Date().toISOString(),
      total: data.length,
      characters: data,
    };

    // Cria pasta se não existir
    fs.mkdirSync(directoryPath, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2), "utf-8");

    console.log(`💾 ${data.length} personagens salvos em ${filePath}`);
  } catch (error) {
    console.error("❌ Erro ao extrair personagens:", error.message);
  }
};

extractCharacters();
