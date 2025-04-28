import { Button, Tooltip } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import clsx from "clsx";

function App() {
  const [random_word, setRandomWord] = useState<string[]>(["", "", "", ""]);
  const [word, setWord] = useState<string[]>(["", "", "", ""]);
  const [reports, setReports] = useState<string[]>([]);

  function fnGetRandomWord() {
    setWord(["", "", "", ""]);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = new Array(4)
      .fill("")
      .map(() => characters[Math.floor(Math.random() * characters.length)]);
    return result;
  }

  function fnChangeWord(value: string, index: number) {
    const newChar = value.toUpperCase().replace(/[^A-Z]/, "");
    const updated = [...word];
    updated[index] = newChar;
    setWord(updated);
  }

  function fnCheckWordMatch() {
    let correct_position = 0;
    let correct_char = 0;
    const used_word = Array(word.length).fill(true);

    for (let i = 0; i < random_word.length; i++) {
      if (word[i] === random_word[i]) {
        correct_position++;
      }
      for (let j = 0; j < word.length; j++) {
        if (random_word[i] === word[j] && used_word[j]) {
          used_word[j] = false;
          correct_char++;
          break;
        }
      }
    }

    if (correct_position == 4 && correct_char == 4) {
      alert("คำตอบถูกต้อง");
      setReports([]);
    } else {
      setReports((prev) => [
        ...prev,
        `ตัวอักษรที่ถูกต้อง ${correct_char} ตัว ตำแหน่งที่ถูกต้อง ${correct_position} ตำแหน่ง`,
      ]);
    }
  }

  useEffect(() => {
    setRandomWord(fnGetRandomWord);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-evenly items-center relative p-4 md:flex-row">
      <div className="absolute top-10 right-auto left-auto text-black p-4 flex gap-4">
        <Button
          type="primary"
          onClick={() => {
            setRandomWord(fnGetRandomWord);
            setReports([]);
          }}
        >
          สุ่มคำใหม่
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => {
            alert(`คำตอบคือ ${random_word.join(" ")}`);
          }}
        >
          เฉลย
        </Button>
      </div>
      <div className="flex flex-col h-11 gap-4">
        <div className="flex gap-2">
          {word.map((char, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={char}
              onChange={(e) => fnChangeWord(e.target.value, index)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded"
            />
          ))}
        </div>
        <Button
          type="primary"
          className="py-4"
          onClick={() => {
            if (word.every((char) => char !== "")) {
              fnCheckWordMatch();
            }
          }}
        >
          ตกลง
        </Button>
      </div>
      <hr className="bg-gray-300 w-[2px] h-52 rounded-full hidden md:flex" />
      <div className="flex flex-col gap-4 max-h-80 overflow-auto">
        {reports.length <= 0 ? (
          <>ลองทายคำดูสิ</>
        ) : (
          <>
            {reports
              .slice()
              .reverse()
              .map((report, index) => (
                <div
                  key={index}
                  className={clsx(
                    "text-center text-xl bg-gray-200 p-2 rounded-lg",
                    index === 0 && "font-bold"
                  )}
                >
                  {report} ครั้งที่ {reports.length - index}
                </div>
              ))}
          </>
        )}
      </div>
      <div className="absolute bottom-8 right-8">
        <Tooltip title="Go to GitHub">
          <GithubOutlined
            className="text-[50px] animate-bounce cursor-pointer"
            onClick={() =>
              window.open(
                "https://github.com/NaiKit20/random-word.git",
                "_blank"
              )
            }
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
