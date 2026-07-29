const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function fetchQuestions() {
  const response = await fetch(`${API_BASE_URL}/api/v1/questions`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("질문을 불러오지 못했습니다.");
  }

  const data = await response.json();

  if (!Array.isArray(data.questions)) {
    throw new Error("질문 데이터 형식이 올바르지 않습니다.");
  }

  return data.questions;
}
