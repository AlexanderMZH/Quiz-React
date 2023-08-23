export const FetchQuiz = async () => {
  const result = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
  const data = await result.json()
  return data.results
}