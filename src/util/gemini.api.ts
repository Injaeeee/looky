const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_VISION_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent";
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

export async function fetchGeminiResponse(prompt: string) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "응답 없음";
  } catch (error) {
    console.error("Gemini API 요청 오류:", error);
    return "에러 발생";
  }
}

export async function analyzeImage(imageFile: File): Promise<string> {
  if (!apiKey) {
    throw new Error("API 키가 설정되지 않았습니다.");
  }

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const base64Image = reader.result?.toString().split(",")[1];

        const response = await fetch(`${GEMINI_VISION_API_URL}?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inline_data: {
                      mime_type: imageFile.type,
                      data: base64Image,
                    },
                  },
                  {
                    text: "패션 스타일을 미니멀,캐주얼,아메카지,시티보이,스트릿,스포티,유니크,러블리,레트로 중 하나를 따옴표로 말해주고 그 이유를 설명해줘 ",
                  },
                ],
              },
            ],
          }),
        });

        const data = await response.json();

        // ✅ API 응답 데이터 타입을 명확히 지정
        const result: string =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "분석 실패";

        resolve(result);
      } catch (error) {
        reject("에러 발생: " + String(error));
      }
    };

    reader.onerror = (error) => reject("파일 읽기 오류: " + String(error));
    reader.readAsDataURL(imageFile);
  });
}
