import React from "react";
import Link from "next/link";
import Head from "next/head";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useGlobalContext from "@/provider/Provider";

function LoginPage() {
  const { isLoggedIn, login, loading, error, refreshState} = useGlobalContext()
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({email, password});
  };

  React.useEffect(() => {
    refreshState();
    isLoggedIn && router.push("/");
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>User Management App - Login</title>
        <meta name="description" content="an App for managing user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isLoggedIn && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[95%] sm:w-[450px]">
            <h1
              data-test="login-title"
              className="pb-16 text-black text-5xl font-bold text-center"
            >
              Login
            </h1>
            <form className="flex flex-col container max-w-screen-sm">
              <div className="grid grid-rows-2 gap-4">
                <input
                  className="px-2 py-3 border-2 rounded-lg border-blue-100"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  data-test="email-input"
                />
                <input
                  className="px-2 py-3 border-2 rounded-lg border-blue-100"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  data-test="password-input"
                />
              </div>
              {error && <h1 className="p-3 mt-4 bg-red-500 text-white">{error}</h1>}
              {loading ? (
                <button
                  disabled
                  className="px-2 py-3 mt-10 flex justify-center items-center bg-slate-300 rounded-lg"
                >
                  <Loading />
                  Login
                </button>
              ) : (
                <button
                  className="px-2 py-3 mt-10 flex justify-center items-center bg-blue-200 rounded-lg hover:bg-blue-300"
                  onClick={handleLogin}
                  data-test="login-button"
                >
                  Login
                </button>
              )}
            </form>
            <p data-test="dont-have-account" className="py-2 text-center">
              Don’t have an account?{" "}
              <Link className="border-b-2 border-purple-200 hover:border-purple-400" href="/register">
                Sign Up for Free
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
