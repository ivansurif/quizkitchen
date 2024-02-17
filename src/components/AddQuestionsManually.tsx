import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios, { AxiosError } from "axios";

const BACKEND_NODE_URL = import.meta.env.VITE_BACKEND_NODE_URL;

type MyFormData = {
  projectName: string;
  moduleName: string;
  question: {
    type: string;
    title: string;
    context: string;
    text: string;
    isReal: boolean;
    explanation: string;
    explanation_img_uri: string | undefined;
  };
  answers: {
    value: string;
    isCorrect: boolean;
  }[];
};

const MyForm = () => {
  const [formData, setFormData] = useState<MyFormData>({
    projectName: "AZ-204",
    moduleName: "",
    question: {
      type: "radio",
      title: "",
      context: "",
      text: "",
      isReal: false,
      explanation: "",
      explanation_img_uri: undefined
    },
    answers: [
      {
        value: "",
        isCorrect: false,
      },
      {
        value: "",
        isCorrect: false,
      },
    ],
    // Initialize other fields as needed
  });

  const addAnswer = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      answers: [
        ...prevFormData.answers,
        { value: "", isCorrect: false }, // Add a new answer object
      ],
    }));
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    const index = parseInt(name.split(".")[1], 10);
    if (name === "question.isReal") {
      setFormData(prevState => ({
          ...prevState,
          question: {
              ...prevState.question,
              isReal: checked, // Use 'checked' for boolean values
          },
      }));
    } else if (type === "checkbox") {
      // Handle the switch change for isCorrect
      setFormData((prevState) => ({
        ...prevState,
        answers: prevState.answers.map((ans, idx) =>
          idx === index ? { ...ans, isCorrect: checked } : ans
        ),
      }));
    } else if (name.startsWith("answerValue")) {
      const updatedAnswers = formData.answers.map((answer, idx) =>
        idx === index ? { ...answer, value: value } : answer
      );

      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      // Handle other input changes, e.g., question.title, question.context, etc.
      // Splitting the name by '.' to handle nested state properties
      const nameParts = name.split(".");
      if (nameParts.length === 2) {
        // Handle nested fields such as 'question.title'
        const [parentKey, childKey] = nameParts;
        setFormData((prevState: any) => {
          // Check if parentKey is a key in prevState
          if (parentKey in prevState) {
            const newValue = name === "question.explanation_img_uri" && value === '' ? undefined : value;
            return {
              ...prevState,
              [parentKey]: {
                ...(prevState[parentKey] as any),
                [childKey]: newValue,
              },
            };
          }
          return prevState;
        });
      } else {
        // Handle top-level fields
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send formData to the API
    try {
      const response = await axios.post(
        `${BACKEND_NODE_URL}/add-questions-manual`,
        formData
      );
      console.log("Success:", response.data);
      setSuccessMessage("Operation was successful!");
      setShowMessage(true);

      // Handle success
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows error is of type AxiosError
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          console.error("Error data:", axiosError.response.data);
          console.error("Error status:", axiosError.response.status);
          console.error("Error headers:", axiosError.response.headers);
        } else if (axiosError.request) {
          console.error("Error request:", axiosError.request);
        } else {
          console.error("Error message:", axiosError.message);
        }
      } else {
        // Error is not an AxiosError
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleClose = () => {
    setShowMessage(false);
    window.location.reload();
  };

  return (
    <div className="add-question-form">
      <h1>Enter new question</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group 
        >
          <Form.Label>Project Name:</Form.Label>
          <Form.Control
            name="projectName"
            as="select"
            value={formData.projectName}
            onChange={handleFormChange}
          >
            <option value="AZ-204">AZ-204</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            {/* Add more options as needed */}
          </Form.Control>
          <Form.Label> Name:</Form.Label>
          <Form.Control
            name="moduleName"
            as="select"
            value={formData.moduleName}
            onChange={handleFormChange}
          >
            <option value="" disabled></option> {/* This is the default blank/disabled option */}

            <option value="App Service">App Service</option>
            <option value="ACR">Container Registry</option>
            <option value="ACI">ACI</option>
            <option value="Azure Container Apps">Azure Container Apps</option>
            <option value="Azure Functions">Azure Functions</option>
            <option value="Azure Cosmos DB">Azure Cosmos DB</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>
        <br />
        <h2>Question</h2>
        <Form.Group
        // onChange={handleFormChange}
        >
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="question.title"
            value={formData.question.title}
            onChange={handleFormChange}
          />
          <Form.Label>Type</Form.Label>
          <Form.Control
            name="question.type"
            as="select"
            value={formData.question.type}
            onChange={handleFormChange}
          >
            <option value="radio">radio</option>
            <option value="checkboxes">checkboxes</option>
            <option value="free_text">free_text</option>
            <option value="option3">Option 3</option>
            {/* Add more options as needed */}
          </Form.Control>
          <Form.Label>Context</Form.Label>
          <Form.Control
            as="textarea"
            name="question.context"
            value={formData.question.context}
            onChange={handleFormChange}
          />
          <Form.Label>Text</Form.Label>
          <Form.Control
            type="text"
            name="question.text"
            value={formData.question.text}
            onChange={handleFormChange}
          />
          <Form.Check // prettier-ignore
              type="switch"
              id={`question-isreal`} // Ensure id is unique for each switch
              name="question.isReal"
              label="Real Question"
              checked={formData.question.isReal}
              onChange={handleFormChange}
            />
            <Form.Label>Explanation</Form.Label>
          <Form.Control
            as="textarea"
            name="question.explanation"
            value={formData.question.explanation}
            onChange={handleFormChange}
          />
          <Form.Label>Explanation URI</Form.Label>
          <Form.Control
            type="text"
            name="question.explanation_img_uri"
            value={formData.question.explanation_img_uri}
            onChange={handleFormChange}
          />
        </Form.Group>
        <br />
        <h2>Answer Options</h2>
        {formData.answers.map((answer, index) => (
          <Form.Group key={index}>
            <Form.Label>Answer option {index + 1}</Form.Label>
            <Form.Control
              as="textarea"
              name={`answerValue.${index}`}
              value={answer.value}
              onChange={handleFormChange}
            />
            <Form.Check // prettier-ignore
              type="switch"
              id={`custom-switch-${index}`} // Ensure id is unique for each switch
              name={`answerIsCorrect.${index}`}
              label="Correct"
              checked={answer.isCorrect}
              onChange={handleFormChange}
            />
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={addAnswer}>
          Add Answer
        </Button>
        <br />
        {/* Add other form fields as needed */}
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* {successMessage && <div className="success-message">{successMessage}</div>} */}
        {showMessage && (
          <div className="position-fixed top-50 start-50 translate-middle">
            <div className="alert alert-success d-flex align-items-center justify-content-between">
              {successMessage}
              <button className="btn-close" onClick={handleClose}></button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default MyForm;
