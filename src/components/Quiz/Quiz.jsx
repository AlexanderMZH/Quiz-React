import { useEffect, useState } from "react";
import { FetchQuiz } from "../../service";
import Answers from "../Answers";
import Question from "../Question";

import "./style.css";

const Quiz = () => {
  const [data, setData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  const refactorAnswers = (data) => {
    let answers = [...data.incorrect_answers, data.correct_answer];
    return [
      ...answers.map((answer, index, arr) => {
        return {
          id: index,
          value: answer,
          isCorrect: arr.length - 1 === index,
          clicked: false,
        };
      }),
    ];
  };

  const fetchData = async () => {
    const data = await FetchQuiz();
    for (let i = 0; i < data.length; i++) {
      data[i] = {
        ...data[i],
        id: i,
        answered: false,
        answers: refactorAnswers(data[i]),
        userAnswerId: undefined,
      };
    }
    setData(data);
  };

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestionIndex(questionIndex);
  };

  const handleArrowClick = (isNext) => {
    if (isNext) {
      setCurrentQuestionIndex((currentState) => {
        if (currentState === data.length - 1) return 0;
        return currentState + 1;
      });
    } else {
      setCurrentQuestionIndex((currentState) => {
        if (currentState === 0) return data.length - 1;
        return currentState - 1;
      });
    }
  };

  const handleAnswer = (questionId, answerId) => {
    setData((currentState) => [
      ...currentState.map((question) => {
        return {
          ...question,
          answered: question.id === questionId ? true : question.answered,
          answers: question.id === questionId ? [
            ...question.answers.map((answer) => {
              return {
                ...answer,
                clicked: answer.id === answerId ? true : answer.clicked,
              };
            }),
          ] : [...question.answers],
        };
      }),
    ]);
    
    // setCurrentQuestionIndex((curretnState) => {
    //   if (curretnState === data.length - 1) return 0;
    //   return curretnState + 1;
    // });
  };



  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="quiz-outer-container">
      {data && (
        <div className="quiz-container">
          <Question
            currentQuesionIndex={currentQuestionIndex}
            totalQuestions={data.length}
            questionText={data[currentQuestionIndex].question}
            id={data[currentQuestionIndex].id}
            handleArrowClick={handleArrowClick}
            handleQuestionChange={handleQuestionChange}
          />
          <Answers
            data={data[currentQuestionIndex].answers}
            id={data[currentQuestionIndex].id}
            handleAnswer={handleAnswer}
            answered={data[currentQuestionIndex].answered}
          />
        </div>
      )}
    </section>
  );
};

export default Quiz;
