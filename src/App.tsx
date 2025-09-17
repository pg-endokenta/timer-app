import { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState<number>(0); // 経過秒数
  const [isRunning, setIsRunning] = useState<boolean>(false); // 動作中かどうか

  useEffect(() => {
    let timer: number | undefined;

    if (isRunning) {
      // 1秒ごとにカウントを増やす
      timer = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    // クリーンアップ処理（タイマー解除）
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]); 
  // isRunning が変わるたびに実行される

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // フォーマット関数: 秒数を "MM:SS" に変換
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    // padStart(2, "0") → 一桁のときは0埋め
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>タイマー: {formatTime(seconds)} 秒</h1>
      <button onClick={handleStart}>スタート</button>
      <button onClick={handleStop}>ストップ</button>
      <button onClick={handleReset}>リセット</button>
    </div>
  );
}

export default App
