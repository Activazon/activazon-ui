const WalkThroughBody = ({ heroImageSrc, title, instructions }) => {
  return (
    <div class="walkthrough-body d-flex flex-direction-column gap-4">
      <img class="walkthrough-hero" src={heroImageSrc} />
      <div className="container">
        <p class="walkthrough-title">{title}</p>
      </div>
      <div class="container">
        <div class="d-flex flex-column gap-3">
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
