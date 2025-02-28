import React from "react";

interface InlineCitationProps {
  url: string;
}

const InlineCitation: React.FC<InlineCitationProps> = ({ url }) => {
  let domain: string;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    domain = url;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden="true"
      className="inline-block ml-1 px-2 py-0.5 bg-foreground/20 hover:bg-primary/40 text-foreground/60 hover:text-primary rounded-full text-xs no-underline transition-all duration-200"
    >
      {domain}
    </a>
  );
};

export default InlineCitation;
