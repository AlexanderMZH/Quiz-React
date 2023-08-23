import AvatarImage from "../../assets/images/avatar.png";
import ChevronLeftSvg from "../../assets/icons/chevron_left.svg";
import ChevronRightSvg from "../../assets/icons/chevron_right.svg";
import "./style.css";
const Questions = (props) => {
  const {
    currentQuesionIndex,
    totalQuestions,
    questionText,
    handleArrowClick,
    handleQuestionChange,
    id,
  } = props;

  const dotsGenerator = Array.from(new Array(totalQuestions));
  return (
    <div className="question-container">
      <div className="question-number-container">
        <div
          className="arrow-container"
          onClick={() => {
            handleArrowClick(false);
          }}
        >
          <img src={ChevronLeftSvg} alt="previous-question" />
        </div>
        <h3 className="question-number">
          Question {currentQuesionIndex + 1}/{totalQuestions}
        </h3>
        <div
          className="arrow-container"
          onClick={() => {
            handleArrowClick(true);
          }}
        >
          <img src={ChevronRightSvg} alt="next-question" />
        </div>
      </div>
      <div className="image-container">
        <img src={AvatarImage} alt="avatar" />
      </div>
      <div className="question-text-container">
        <p className="question-text">{questionText}</p>
      </div>
      <div className="dots-cotnaier">
        <ul className="dots-ul">
          {dotsGenerator.map((item, index) => {
            return (
              <li className="dots-li" key={`dot_${index}`}>
                <div
                  className={`dot ${
                    index === currentQuesionIndex ? "active" : ""
                  }`}
                  onClick={() => {
                    handleQuestionChange(index);
                  }}
                ></div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Questions;
