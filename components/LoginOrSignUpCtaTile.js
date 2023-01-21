import Link from "next/link";
import { useTrans } from "lib/trans";

const LoginOrSignUpCtaTile = ({ alternativeTitle }) => {
  //   const { isAuthenticated } = useAuth();
  const { i } = useTrans();
  return (
    <div className="card card-body tile tile-login-or-signup-cta">
      <div className="row text-center gy-3">
        <div className="col-12">
          <i className="tile-icon bi bi-shield-shaded"></i>
        </div>
        <div className="col-12">
          <h2 className="tile-title">
            {alternativeTitle || i("Take Control of Your Safety")}
          </h2>
        </div>
        <div className="col-12">
          <p className="tile-description">
            {i(
              "Sign Up to stay one step ahead by getting crime reports for your neighborhood or where your next trip will be."
            )}
          </p>
        </div>
        <div className="col-12">
          <Link href="/signup" className="btn btn-tile">
            {i("Sign Up")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignUpCtaTile;
