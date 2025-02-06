import React, { useState } from "react";
import { analyzeImage, fetchGeminiResponse } from "../util/gemini.api"; // API 함수 import
import styled from "styled-components";

function ImageAnalyzer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!image) return alert("이미지를 먼저 선택하세요.");
    setResult("분석 중...");
    const analysis = await analyzeImage(image);
    setResult(analysis);
  };

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await fetchGeminiResponse(input);
    setResponse(result);
  };

  return (
    <Container>
      <h2>패션 스타일 분석</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" width={200} />}
      <button onClick={handleAnalyze}>분석하기</button>
      <p>결과: {result}</p>

      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="질문을 입력하세요..."
        />
        <button type="submit">보내기</button>
      </form>
      <p>응답: {response}</p>
    </Container>
  );
}

export default ImageAnalyzer;

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 90px auto 30px;

  @media (max-width: 768px) {
    margin: 80px auto 30px;
  }
`;
const CustomInput = styled.input`
  padding: 12px 17px;
  border: 1px solid var(--gray800);
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  background: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--pink100);
    outline: none;
  }
`;
