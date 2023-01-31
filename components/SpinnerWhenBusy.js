const SpinnerWhenBusy = ({ isBusy, children }) => {
  if (isBusy) {
    return (
      <div className="w-100 text-center mt-5">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        ></div>
      </div>
    );
  }
  return children;
};

export default SpinnerWhenBusy;
