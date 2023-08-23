import "./style.css";
const Answers = (props) => {
  const { data, id, handleAnswer, answered } = props;
  const handleClick = (answerId) => {
    if (answered) return;
    handleAnswer(id, answerId);
  };
  
  return (
    <div className="answers-container">
      <div className="triangle"></div>
      <div className="answers-list-container">
        <ul className="answers-list">
          {data.map((answer, index) => {
            return (
              <li className="answers-list-li" key={`answer_${index}`}>
                <div
                  className={`answer-container ${
                    answer.clicked ? "clicked" : ""
                  } ${answer.isCorrect ? "correct" : "wrong"}`}
                  onClick={() => {
                    handleClick(answer.id);
                  }}
                >
                  <span className="answer-number">{index + 1}</span>
                  <span className="answer-text">{answer.value}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Answers;
