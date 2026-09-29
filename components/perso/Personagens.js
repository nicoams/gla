"use client";
import { useMemo, useState } from "react";
import characterData from "@/data/charactersData.json";
import "./style.scss";
import HexButton from "../hexBtn/HexButton";
import HexB from "../hexB/hexB";

const Personagens = () => {
  const { characters } = characterData;
  const [selectedClasses, setSelectedClasses] = useState([]);

  //STRUCTURING RAW DATA
  /**
   * Limpa ou corrige o nome de um personagem.
   * Aplica correções manuais e regras automáticas.
   *
   * @param {string} name - Nome original do personagem.
   * @param {boolean} logChanges - Mostra alterações no console.
   * @returns {string} Nome final corrigido.
   */
  function cleanCharacterName(name, logChanges = false) {
    let original = name.trim();
    let cleaned = original;

    // 🔧 Correções manuais específicas (casos únicos)
    // Formato: "nome original" : "novo nome"
    const manualFixes = {
      "marshall d. teach barba negra": "marshall d. teach",
      "x-drake": "X-Drake",
    };

    // Se o nome estiver nas correções manuais, aplica diretamente
    if (manualFixes[cleaned.toLowerCase()]) {
      cleaned = manualFixes[cleaned.toLowerCase()];
    } else {
      // 🔄 Correções automáticas (remoção de sufixos comuns)
      const suffixes = [
        "dio",
        "lost",
        "poseidon",
        "rag",
        "sanitaria",
        "coxinha",
        "abacaxi",
        "visno",
        "duduh",
        "ghoul den berry",
        "piseiro",
        "gurren",
        "zhao feng",
        "athena",
        "kolivier"
      ];

      for (const suffix of suffixes) {
        const regex = new RegExp(`\\b${suffix}$`, "i");
        if (regex.test(cleaned)) {
          cleaned = cleaned.replace(regex, "").trim();
          break;
        }
      }
    }

    // 🧽 Capitaliza cada palavra
    cleaned = cleaned
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    // 🧾 Log opcional
    if (logChanges && cleaned !== original) {
      console.log(`🧹 '${original}' → '${cleaned}'`);
    }

    return cleaned;
  }

  const updatedCharacters = characters.map((char) => {
    const newChar = { ...char };
    newChar.name = cleanCharacterName(newChar.name, false);

    //SEX
    const female = [
      "Alvida",
      "Baby 5",
      "Boa Hancock",
      "Bonney",
      "Carrot",
      "Hina",
      "Kalifa",
      "Miss Doublefinger Zala",
      "Miss Goldenweek",
      "Nami",
      "Nami (ts)",
      "Nefertari Vivi",
      "Nico Robin",
      "Perona",
      "Robin (ts)",
      "Tashigi",
      "Uta",
      "Vinsmoke Reiju",
    ];

    const both = ["Leo & Mansherry", "Mr.4", "Mr.5"];

    // CLASSES
    const marine = ["Bastille", "Dalmatian", "Hina", "Smoker", "X-Drake"];

    const mugiwara = [
      "Brook",
      "Franky",
      "Monkey D. Luffy",
      "Nami",
      "Robin",
      "Roronoa Zoro",
      "Tony Tony Chopper",
      "Ussopp",
      "Vinsmoke Sanji",
    ];

    const priest = ["Gedatsu", "Ohm", "Satori", "Shura"];

    const royalty = [
      "Leo & Mansherry",
      "Rebecca",
      "Vinsmoke Ichiji",
      "Vinsmoke Niji",
      "Vinsmoke Reiju",
      "Vinsmoke Sanji",
      "Vinsmoke Yonji",
    ];

    const supernova = [
      "Basil Hawkins",
      "Bonney",
      "Capone Gang Bege",
      "Eustass Kid",
      "Killer",
      "Monkey D. Luffy",
      "Roronoa Zoro",
      "Scratchman Apoo",
      "Trafalgar Law",
      "Urogue",
      "X-Drake",
    ];

    // adiciona sexo quando aplicável
    const name = newChar.name;

    // garante que class sempre seja um array
    newChar.class = Array.isArray(newChar.class) ? [...newChar.class] : [];

    // atribui sexo com base nos arrays
    if (female.includes(name)) {
      newChar.class.push("female");
    } else if (both.includes(name)) {
      newChar.class.push("female");
      newChar.class.push("male");
    } else {
      newChar.class.push("male");
    }

    // adiciona classes extras conforme o nome
    if (marine.includes(name)) {
      newChar.class.push("marine");
    }
    if (mugiwara.includes(name)) {
      newChar.class.push("mugiwara");
    }
    if (priest.includes(name)) {
      newChar.class.push("priest");
    }
    if (royalty.includes(name)) {
      newChar.class.push("royalty");
    }
    if (supernova.includes(name)) {
      newChar.class.push("supernova");
    }

    return newChar;
  });

  const allClasses = useMemo(() => {
    const classes = Array.from(
      new Set(updatedCharacters.flatMap((c) => c.class))
    );
    console.log("classes :>> ", classes);
    return classes
      .sort((a, b) => a.localeCompare(b))
      .map((cls) => cls.charAt(0).toUpperCase() + cls.slice(1));
  }, [updatedCharacters]);

  //console.log("updatedCharacters :>> ", updatedCharacters);
  console.log("allClasses :>> ", allClasses);

  //FILTER
  const handleToggleClass = (className) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className]
    );
  };

  const filteredCharacters = updatedCharacters.filter((char) =>
    selectedClasses.length === 0
      ? true
      : selectedClasses.some((cls) => char.class.includes(cls))
  );

  return (
    <div className="page-container">
      <h1>Personagens</h1>
      {/*       <ul>
        {updatedCharacters.map((char, index) => (
          <li key={index}>
            <strong>{char.name}</strong> — {char.tier.toUpperCase()}
            <br />
            Classes: {char.class.join(", ")}
          </li>
        ))}
      </ul> */}
      <div className="character-list-container">
        {updatedCharacters.map((char, index) => (
          <div key={index} className="character-container">
            <div className="character-modal">
              <div className="character-data">
                <p className="name">{char.name}</p>
                <p className="tier">{char.tier.toUpperCase()}</p>
                <div>
                  <p>Classes:</p>
                  <ul>
                    {char.class.map((cls, i) => (
                      <li key={i}>{cls}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="character-quests">
                {/* <HexButton />
                <HexButton /> */}
                <HexB />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personagens;
