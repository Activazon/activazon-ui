const WalkThroughBody = ({ heroImageSrc, title, instructions }) => {
  return (
    <div class="walkthrough-body d-flex flex-direction-column gap-4">
      <div className="walkthrough-hero">
        <img src={heroImageSrc} />
      </div>
      <div className="container">
        <h1 class="walkthrough-title">{title}</h1>
      </div>
      <div class="container">
        <div class="d-flex flex-column gap-2">
          {instructions.map((instruction, index) => (
            <div key={`instruction-${index}`} class="walkthrough-instruction">
              {instruction}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalkThroughBody;
