"use client";

import React from "react";
import * as Sentry from "@sentry/nextjs";

const Page = () => {
  const onClick = async () => {
    const transaction = Sentry.startTransaction({
      name: "Example Frontend Transaction",
    });

    Sentry.configureScope((scope) => {
      scope.setSpan(transaction);
    });

    try {
      const res = await fetch("/api/sentry-example-api");
      if (!res.ok) {
        throw new Error("Sentry Example Frontend Error");
      }
    } finally {
      transaction.finish();
    }
  };
  return (
    <div>
      <button
        onClick={onClick}
        className="tw-bg-blue-light tw-text-black tw-text-lg"
      >
        Trigger error
      </button>
    </div>
  );
};

export default Page;
