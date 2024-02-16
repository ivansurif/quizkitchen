import axios from "axios";

const VITE_BACKEND_NODE_URL = import.meta.env.VITE_BACKEND_NODE_URL;


export interface Answer {
    value: string;
    isCorrect: boolean;
  };

  
export async function loadQuestion() {
    try {
        const questionData = await axios.get(`${VITE_BACKEND_NODE_URL}/getQuestion`);
        const optionTexts: Answer[] = questionData.data.details.answers;
        return optionTexts; // Return the array of option texts
    } catch (e) {
        console.error('Error fetching question:', e);
    }
};

export async function getSchema() {
    try {
        const questionData = await axios.get(`${VITE_BACKEND_NODE_URL}/schema`);
        // const optionTexts: Answer[] = questionData.data.details.answers;
        //return optionTexts; // Return the array of option texts
        return questionData;
    } catch (e) {
        console.error('Error connecting to server', e);
    }
};