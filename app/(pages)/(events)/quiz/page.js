"use client"

import React from "react";
import answersQuiz from "@/data/foxyData.json";
import "./style.scss";

const Quiz = () => {
  const [search, setSearch] = React.useState("")

  const filteredTrue = answersQuiz.verdadeiras.filter((answer) => answer.toLowerCase().includes(search.toLocaleLowerCase()));
  const filteredFalse = answersQuiz.falsas.filter((answer) => answer.toLowerCase().includes(search.toLocaleLowerCase()));

  return (
      <div className="answers-container">
        <input type="text" placeholder="Digite a sentença" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className="answers">
          <ul className="true">
            {filteredTrue.map((answer, index) => (
              <li key={index}>{answer} </li>
            ))}
          </ul>
          <ul className="false">
            {filteredFalse.map((answer, index) => (
              <li key={index}>{answer} </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default Quiz;
