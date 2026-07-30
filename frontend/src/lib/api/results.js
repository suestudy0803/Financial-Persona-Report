const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function submitResults(answers) {
  const response = await fetch(`${API_BASE_URL}/api/v1/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });

  if (!response.ok) {
    throw new Error("결과를 제출하지 못했습니다.");
  }

  const data = await response.json();

  if (!data.result_id || !data.code) {
    throw new Error("결과 응답 형식이 올바르지 않습니다.");
  }

  return data;
}

export async function fetchResult(resultId) {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/results/${encodeURIComponent(resultId)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("결과를 불러오지 못했습니다.");
  }

  const data = await response.json();

  if (!data.result_id || !data.code || !data.persona || !data.traits) {
    throw new Error("결과 응답 형식이 올바르지 않습니다.");
  }

  return data;
}
