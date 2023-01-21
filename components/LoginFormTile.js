const LoginFormTile = ({}) => {
  return (
    <div className="mt-3">
      <form className="mt-0">
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="email" />
          <label for="email">Email address</label>
        </div>
        {/* <div className="form-floating mb-3">
          <input type="pasword" className="form-control" id="pasword" />
          <label for="pasword">Password</label>
        </div> */}
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg fw-bolder"
            id="submit"
          >
            Continue
          </button>
        </div>
        <div className="mb-3">
          <a className="btn btn-primary-outline w-100" href="">
            Already have an account? Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginFormTile;
