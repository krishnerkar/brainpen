"use client";

import LoadingDots from "@/components/loading-dots";
import parseJsonSse from "@beskar-labs/parse-json-sse";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const generate = async () => {
    setOutput("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `the following is a paragraph of rough thoguhts/ideas, please refine them into more clear speech with structured sentences that will help communicating the thoughts and ideas to everyone
          
          ${text}`,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    await parseJsonSse<{
      id: string;
      object: string;
      created: number;
      choices?: {
        text: string;
        index: number;
        logprobs: null;
        finish_reason: null | string;
      }[];
      model: string;
    }>({
      data,
      onParse: (json) => {
        if (!json.choices?.length) {
          throw new Error("Something went wrong.");
        }

        const { text } = json.choices[0];

        setOutput((prev) => prev + json.choices?.[0].text);
      },
      onFinish: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div>
      <div
        style={{
          boxShadow: "0px 0px 98px 28px rgba(255, 74, 74, 0.25)",
        }}
        className="h-20 w-20 rounded-full bg-easy-red"
      />

      <h1 className="mt-14 font-display text-7xl leading-tight text-white">
        Articulate your{" "}
        <span className="text-easy-red underline">thoughts</span> into words
      </h1>

      <h2 className="mt-16 font-body text-2xl text-white">
        We use AI to take your random or rough ideas and convert them into
        well-structured and clear sentences, making them more effective and
        efficient to communicate with everyone else.
      </h2>

      <p className="mt-20 font-display text-3xl text-white">write here</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="mt-4 w-full rounded-lg bg-almost-black p-6 font-body text-2xl text-white outline-none"
      />
      <button
        onClick={generate}
        disabled={loading}
        className={`mt-8 flex h-14 w-1/3 items-center justify-center rounded-full bg-easy-red p-4 px-10 font-display text-xl text-white outline-none
       
        ${loading ? "cursor-not-allowed" : "cursor-pointer"}
        ${!loading && "hover:bg-white hover:text-easy-red"}
       `}
      >
        {loading ? <LoadingDots color="white" /> : <p>make magic happen ✨</p>}
      </button>

      {output && (
        <div className="mt-20">
          <p className="font-display text-3xl text-white">output</p>
          <p className="mt-12 font-body text-2xl text-white">{output}</p>
        </div>
      )}
    </div>
  );
}
