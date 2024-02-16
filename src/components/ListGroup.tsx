import { useState, useEffect } from "react";
import { loadQuestion, Answer } from "./../ServerConnect";

import axios from "axios";

const BACKEND_NODE_URL = import.meta.env.VITE_BACKEND_NODE_URL;


export default function ListGroup() {
  const [items, setItems] = useState<Answer[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const questions = await loadQuestion();
        if (questions) {
          setItems(questions);
        }
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
    }

    fetchQuestions();
  }, []); // The empty dependency array ensures this effect runs only once after the component mounts

  const handleItemClick = async (index: number) => {
    setSelectedIndexes((selectedIndexes) => {
      if (selectedIndexes.includes(index)) {
        console.log(
          `Index ${index} already exists in selectedIndexes array. REMOVING`
        );
        return selectedIndexes.filter((value) => value !== index);
      } else {
        console.log(
          `Index ${index} doesn't exist in selectedIndexes array. ADDING`
        );
        return [...selectedIndexes, index];
      }
    });

    try {
      const newSelectedIndexes = selectedIndexes.includes(index)
        ? selectedIndexes.filter((i) => i !== index)
        : [...selectedIndexes, index];

      const response = await axios.post(`${BACKEND_NODE_URL}/test-connection`, {
        selectedIndexes: newSelectedIndexes,
      });
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const lis = items.map((item, index) => (
    <li
      className={
        selectedIndexes.includes(index)
          ? "list-group-item active"
          : "list-group-item"
      }
      key={index}
      onClick={() => handleItemClick(index)}
    >
      {index+1}. {item.value}
    </li>
  ));

  return (
    <>
      <h1 className="title">List</h1>
      <ul className="large-list-group list-group">{lis}</ul>
    </>
  );
}
