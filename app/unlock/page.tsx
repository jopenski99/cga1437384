"use client";
import { useEffect, useState } from "react";
import { useAppLock } from "@/lib/providers/AppLockProvider";
import { biometricUnlock, hasPasskey, setupPasskey } from "@/lib/security/biometric";
import '@/components/ui/styles/background.css'



type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};


export default function UnlockPage() {
  const { unlock } = useAppLock();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("PWA installed");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };


  async function handleBiometricUnlock() {

    if (!hasPasskey()) {
      const created = await setupPasskey();
      if (!created) return;
    }

    const success = await biometricUnlock();
    if (success) {
      console.log("Biometric auth succeeded");
      unlock();
    } else {
      alert("Biometric authentication failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="jp-matrix" style={{ zIndex: 1 }}>
        <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span>
        <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span>
        <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span> <span>ジ</span> <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span>
        <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span>
        <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span>
        <span>ホ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span>
        <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span>
        <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span> <span>ジ</span> <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span>
        <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span>
        <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span>
        <span>ヘ</span> <span>ホ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span>
        <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span>
        <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span> <span>ジ</span> <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span>
        <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span>
        <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span>
        <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span>
        <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span > <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span>
        <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span > <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span> <span>ジ</span> <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span>
        <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span > <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span>
        <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span > <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span>
        <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>ア</span> <span>K</span> <span>A</span> <span>エ</span> <span>A</span> <span>P</span > <span>P</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span>
        <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span > <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span>
        <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span > <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>Y</span> <span>A</span> <span>W</span> <span>A</span> <span>ゼ</span> <span>ゾ</span>
        <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span > <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span>
        <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span > <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span>
        <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span>  <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span > <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span>
        <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span > <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span>
        <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span > <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span> <span>ジ</span> <span>ズ</span> <span>ゼ</span>
        <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span > <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span>
        <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span > <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span>
        <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span > <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span>
        <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span > <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span>
        <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span > <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span> <span>ジ</span> <span>ズ</span>
        <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span > <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span>
        <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span > <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span>
        <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span>
        <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span> <span>ム</span>
        <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span> <span>ジ</span>
        <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span> <span>イ</span>
        <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span>
        <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>ア</span> <span>イ</span > <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span>
        <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span> <span>ミ</span>
        <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span> <span>ザ</span>
        <span>ジ</span> <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span> <span>ア</span>
        <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span>
        <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span>
        <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span> <span>マ</span>
        <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span> <span>ゴ</span>
        <span>ザ</span> <span>ジ</span> <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span> <span>ポ</span>
        <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span>
        <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span>  <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span>
        <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span> <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span>
        <span>マ</span> <span>ミ</span> <span>ム</span> <span>メ</span> <span>モ</span> <span>ヤ</span> <span>ユ</span> <span>ヨ</span> <span>ラ</span> <span>リ</span> <span>ル</span> <span>レ</span> <span>ロ</span> <span>ワ</span> <span>ヲ</span> <span>ン</span> <span>ガ</span> <span>ギ</span> <span>グ</span> <span>ゲ</span>
        <span>ゴ</span> <span>ザ</span> <span>ジ</span> <span>ズ</span> <span>ゼ</span> <span>ゾ</span> <span>ダ</span> <span>ヂ</span> <span>ヅ</span> <span>デ</span> <span>ド</span> <span>バ</span> <span>ビ</span> <span>ブ</span> <span>ベ</span> <span>ボ</span> <span>パ</span> <span>ピ</span> <span>プ</span> <span>ペ</span>
        <span>ポ</span> <span>ア</span> <span>イ</span> <span>ウ</span> <span>エ</span> <span>オ</span> <span>カ</span> <span>キ</span> <span>ク</span> <span>ケ</span> <span>コ</span> <span>サ</span> <span>シ</span> <span>ス</span> <span>セ</span> <span>ソ</span> <span>タ</span> <span>チ</span> <span>ツ</span> <span>テ</span>
        <span>ト</span> <span>ナ</span> <span>ニ</span> <span>ヌ</span> <span>ネ</span> <span>ノ</span> <span>ハ</span> <span>ヒ</span> <span>フ</span> <span>ヘ</span> <span>ホ</span>
      </div>
      <div className="fixed text-center w-full z-50 w-auto border-teal-400 rounded-2xl mt-10" style={{ backdropFilter: 'blur(3px)', border: '1px solid oklch(77.7% 0.152 181.912)' }}>
        <div className=" rounded-2xl p-6 inline-block mt-5 text-white ">
          <h1 className="text-2xl font-bold mb-4">Asset Manager</h1>

          <button
            onClick={handleBiometricUnlock}
            className="px-6 py-3 bg-black text-white rounded bg-teal-500  font-medium rounded-2xl"
          >
            Unlock with Biometrics
          </button>
          <div className="flex items-center justify-between p-3">
            <p className="text-sm mb-2 mt-5 w-1/2">
              Install this app for a better experience 
            </p>
            <button
              onClick={handleInstall}
              className="rounded-lg bg-white text-black px-4 py-2 text-xs font-medium w-2/6 "
            >
              Install 🚀
            </button>
          </div>
        </div>
      </div>

      {/*      <canvas> </canvas> */}

    </main>
  );
}
