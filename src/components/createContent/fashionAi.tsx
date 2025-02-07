import { analyzeImage } from "../../util/gemini.api";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PinkBorderButton } from "../common/button";
import { showToast } from "../common/toast";

interface Props {
  image: File | null;
}

export default function FashionAi({ image }: Props) {
  const [result, setResult] = useState("");
  const [style, setStyle] = useState("");

  const handleAnalyze = async () => {
    if (!image)
      return showToast({
        title: "분석을 위해 이미지를 먼저 선택하세요.",
        status: "error",
      });
    setResult("분석 중...");
    const analysis = await analyzeImage(image);
    setResult(analysis);
  };

  function formatResult(result: string) {
    // **굵은 글씨** 변환
    const boldPattern = /\*\*(.*?)\*\*/g;
    const formattedText = result.replace(boldPattern, "<strong>$1</strong>");

    return formattedText;
  }

  useEffect(() => {
    const quotePattern = /["']([^"']+)["']/g;
    let matches = [];
    let match;

    while ((match = quotePattern.exec(result)) !== null) {
      matches.push(match[1]); // 큰따옴표 안의 텍스트 저장
    }

    if (matches.length > 0) {
      setStyle(matches.join(", ")); // 배열을 문자열로 합쳐서 setStyle에 전달
    }
  }, [result]);

  return (
    <>
      <AnalyzeWrapper>
        <ExplanationWrapper>
          <Title>패션 스타일 분석</Title>

          <Explanation>
            분석하기로 패션 스타일을 AI로 진단받아보세요!
          </Explanation>
        </ExplanationWrapper>
        <PinkBorderButton onClick={handleAnalyze} type="button">
          분석하기
        </PinkBorderButton>
      </AnalyzeWrapper>
      <Title> {style} </Title>
      <p dangerouslySetInnerHTML={{ __html: formatResult(result) }} />
    </>
  );
}

const AnalyzeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExplanationWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 800;
  color: var(--pink100);
`;

const Explanation = styled.span`
  font-size: 10px;
  font-weight: 600;
`;
