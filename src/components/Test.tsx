import { useState, useEffect } from "react";
import { getSchema } from "./../ServerConnect";

import axios from "axios";
import { json } from "react-router-dom";

const BACKEND_NODE_URL = import.meta.env.VITE_BACKEND_NODE_URL;


// export default function TestQuery() {
//   // const [items, setItems] = useState<Answer[]>([]);
//   // const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

//   useEffect(() => {
//     // async function fetchQuestions() {
//     //   try {
    //     const res = await getSchema();
    //     if (res) {
    //       console.log(JSON.stringify(res.data));
    //       // const jsonSchema = res.data;
    //       const formData = buildFormDataFromSchema(res.data);
    //       console.log('**********');
    //       console.log(formData);
    //       return formData;
    //     }
    //   } catch (error) {
    //     console.error("Failed to load questions:", error);
    //   }
    
      // function buildFormDataFromSchema(jsonSchema: Record<string, any>) {
      //   const tempFormData: Record<string, any> = {};
      //   for (const key in jsonSchema) {
      //       if (jsonSchema.hasOwnProperty(key)) {
      //         const element = jsonSchema[key];
        
      //         if (element.type === 'string') {
      //           tempFormData[key] = ''; // Default value for string
      //         } else if (element.type === 'object') {
      //           tempFormData[key] = buildFormDataFromSchema(element); // Recursive call for nested objects
      //         } else if (element.type === 'array') {
      //           tempFormData[key] = [{ value: '', isCorrect: false }]; // Default for 'answers' array
      //           // Adjust the default value based on the expected structure of the array items
      //         }
      //         // Include additional type handling as needed
      //       }
      //     }
      //   console.log(tempFormData);

      //   return tempFormData;
      //   }
  //   }

  //   fetchQuestions();
  // }, []); // The empty dependency array ensures this effect runs only once after the component mounts

  // const handleItemClick = async (index: number) => {
  //   setSelectedIndexes((selectedIndexes) => {
  //     if (selectedIndexes.includes(index)) {
  //       console.log(
  //         `Index ${index} already exists in selectedIndexes array. REMOVING`
  //       );
  //       return selectedIndexes.filter((value) => value !== index);
  //     } else {
  //       console.log(
  //         `Index ${index} doesn't exist in selectedIndexes array. ADDING`
  //       );
  //       return [...selectedIndexes, index];
  //     }
  //   });

  //   try {
  //     const newSelectedIndexes = selectedIndexes.includes(index)
  //       ? selectedIndexes.filter((i) => i !== index)
  //       : [...selectedIndexes, index];

  //     const response = await axios.post(`${BACKEND_NODE_URL}/test-connection`, {
  //       selectedIndexes: newSelectedIndexes,
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("There was an error!", error);
  //   }
  // };

  // const lis = items.map((item, index) => (
  //   <li
  //     className={
  //       selectedIndexes.includes(index)
  //         ? "list-group-item active"
  //         : "list-group-item"
  //     }
  //     key={index}
  //     onClick={() => handleItemClick(index)}
  //   >
  //     {index+1}. {item.value}
  //   </li>
//   // ));

//   return (
//     <>
//       <h1 className="title">TEST PAGE</h1>
//       {/* <ul className="large-list-group list-group">{lis}</ul> */}
//     </>
//   );
// }
