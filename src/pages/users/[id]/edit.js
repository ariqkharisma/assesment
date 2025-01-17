import React from "react";
import Head from "next/head";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useGlobalContext from "@/provider/Provider";
import Select from "@/components/Select";
import Link from "next/link";

function Register() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dataUser, setDataUser] = React.useState({});

  const {
    isLoggedIn,
    updateData,
    loading,
    error,
    refreshState,
    fetchData,
    data,
    userInfo,
  } = useGlobalContext();
  const router = useRouter();

  const handleEdit = async () => {
    if (password) {
      await updateData(`/api/users/${router.query.id}`, {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        role,
        password,
      });
    } else
      await updateData(`/api/users/${router.query.id}`, {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        role,
      });

    getDataUser();
  };

  const getDataUser = async () => {
    try {
      const response = await fetchData(`/api/users/${router.query.id}`);
      setDataUser(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    refreshState();
    !isLoggedIn && router.push("/");
    isLoggedIn && getDataUser();
  }, [isLoggedIn, router]);

  React.useEffect(() => {
    if (dataUser) {
      setFirstName(dataUser.first_name);
      setLastName(dataUser.last_name);
      setUsername(dataUser.username);
      setEmail(dataUser.email);
      setRole(dataUser.role);
    }
  }, [dataUser]);

  return (
    <>
      <Head>
        <title>User Management App - Edit User</title>
        <meta name="description" content="an App for managing user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoggedIn && (
        <>
          {loading && <Loading />}
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-[95%] sm:w-[450px]">
              <h1 className="text-4xl text-center font-bold text-align-center border-b-2 border-purple-400 pb-5">
                Edit User
              </h1>
              <form className="flex flex-col container max-w-screen-sm mt-10">
                <div className="grid gap-2">
                  <div>
                    <p>First Name</p>
                    <input
                      className="px-2 py-3 border-2 rounded-lg border-blue-100 w-full"
                      required
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      placeholder="First Name"
                      type="text"
                      autoComplete="first_name"
                      data-test="first_name-input"
                    />
                  </div>
                  <div>
                    <p>Last Name</p>
                    <input
                      className="px-2 py-3 border-2 rounded-lg border-blue-100 w-full"
                      required
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      placeholder="Last Name"
                      type="text"
                      autoComplete="last_name"
                      data-test="last_name-input"
                    />
                  </div>
                  <div>
                    <p>Username</p>
                    <input
                      className="px-2 py-3 border-2 rounded-lg border-blue-100 w-full"
                      required
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      placeholder="Username"
                      type="test"
                      autoComplete="username"
                      data-test="username-input"
                    />
                  </div>
                  <div>
                    <p>Email</p>
                    <input
                      className="px-2 py-3 border-2 rounded-lg border-blue-100 w-full"
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
                  </div>
                  <div>
                    <p>Password</p>
                    <input
                      className="px-2 py-3 border-2 rounded-lg border-blue-100 w-full"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                      type="password"
                      autoComplete="password"
                      data-test="password-input"
                    />
                  </div>
                  {userInfo.role === "admin" && (
                    <div>
                      <p>Role</p>
                      <Select
                        options={[
                          { value: "admin", label: "Admin" },
                          { value: "user", label: "User" },
                        ]}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                {error && (
                  <h1 className="p-3 mt-4 bg-red-500 text-white">{error}</h1>
                )}
                <div className="grid grid-cols-2 gap-x-3 mt-10">
                  <Link
                    className="flex justify-center items-center bg-gray-500 hover:bg-gray-600 py-3 px-4 rounded-lg text-white"
                    href={`/`}
                  >
                    Back
                  </Link>
                  {loading ? (
                    <button
                      disabled
                      className="px-2 py-3 flex justify-center items-center bg-slate-300 rounded-lg"
                    >
                      <Loading />
                      Save
                    </button>
                  ) : (
                    <button
                      className="px-2 py-3 flex justify-center items-center bg-blue-200 hover:bg-blue-300 rounded-lg"
                      onClick={handleEdit}
                      data-test="login-button"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
