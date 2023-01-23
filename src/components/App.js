import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions]= useState({})
  
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((res)=>res.json())
    .then(data=>setQuestions(data))
  },[])

  function handleAddNewQuestion(newQuestion){
    const newQuestions = [...questions,newQuestion]
    setQuestions(newQuestions)
    setPage("list")
  }

  function handleDeleteQuestion(deleteQuestionID){
    const newQuestions = questions.filter((question)=>question.id!==deleteQuestionID.id)
    setQuestions(newQuestions)
  }

  function handleUpdateAnswer(updatedQuestion){
    const newQuestions = questions.map((question)=>{
      if (question.correctIndex===updatedQuestion.correctIndex) {
        return updatedQuestion
      }
      return question
    })
    setQuestions(newQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddNewQuestion={handleAddNewQuestion}/> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onChangeCorrectAnswer={handleUpdateAnswer}/>}
    </main>
  );
}

export default App;
