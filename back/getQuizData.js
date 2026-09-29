import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import cron from "node-cron";

// Caminho do arquivo final
const filePath = "C:/Users/nicho/OneDrive/Documentos/Projects/gla/data/foxyData.json";

// Função que extrai os dados reais do site
async function scrapeFoxy() {
  console.log("🔍 Iniciando scraping...");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://wiki.gla.com.br/index.php/Resposta_Foxy_Quizz", {
    waitUntil: "networkidle2",
  });

  // Espera as tabelas dentro do conteúdo
  await page.waitForSelector(".mw-parser-output table");

  const data = await page.evaluate(() => {
    const tables = document.querySelectorAll(".wikitable");

    if (tables.length < 2) {
      return { verdadeiras: [], falsas: [] };
    }

    const extract = (table) => {
      const listItems = table.querySelectorAll("tbody tr:not(:first-child)");

      return Array.from(listItems)
        .map((tr) => tr.innerText.trim())
        .filter((t) => t.length > 0);
    };

    const verdadeiras = extract(tables[0]);
    const falsas = extract(tables[1]);

    return { verdadeiras, falsas };
  });

  await browser.close();
  return data;
}

// Função que detecta diferenças entre versões
function diffLists(oldList, newList) {
  return {
    added: newList.filter((item) => !oldList.includes(item)),
    removed: oldList.filter((item) => !newList.includes(item)),
  };
}

// Função principal
async function run() {
  const scraped = await scrapeFoxy();

  const newData = {
    lastUpdated: new Date().toISOString(),
    total: scraped.verdadeiras.length + scraped.falsas.length,
    verdadeiras: scraped.verdadeiras,
    falsas: scraped.falsas,
    history: [],
  };

  // Se já existir arquivo, comparar versões
  if (fs.existsSync(filePath)) {
    const old = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const diffTrue = diffLists(old.verdadeiras ?? [], newData.verdadeiras);
    const diffFalse = diffLists(old.falsas ?? [], newData.falsas);

    const changes = {
      date: newData.lastUpdated,
      verdadeiras: diffTrue,
      falsas: diffFalse,
    };

    const noChanges =
      diffTrue.added.length === 0 &&
      diffTrue.removed.length === 0 &&
      diffFalse.added.length === 0 &&
      diffFalse.removed.length === 0;

    if (noChanges) {
      console.log("✔ Nenhuma mudança detectada.");
      return;
    }

    console.log("📌 Mudanças detectadas:");
    console.log(JSON.stringify(changes, null, 2));

    newData.history = [...(old.history ?? []), changes];
  }

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf8");

  console.log("💾 Dados atualizados e salvos com sucesso!");
}

// Executa manualmente
run();

// Agendamento diário à meia noite (00:00)
cron.schedule("0 0 * * *", () => {
  console.log("⏰ Executando scraping automático (00:00)...");
  run();
});
