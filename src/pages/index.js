import React from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import UserCard from "@/components/UserCard";
import Loading from "@/components/Loading";
import useGlobalContext from "@/provider/Provider";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, isLoggedIn, userInfo, logout, fetchData, data } =
    useGlobalContext();
  const router = useRouter();

  React.useEffect(() => {
    !isLoggedIn && router.push("/login");
    isLoggedIn && fetchData("./api/users", "users");
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>User Management App</title>
        <meta name="description" content="an App for managing user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoggedIn && (
        <main
          className={`flex min-h-screen p-5 align-center w-full flex-col items-center ${inter.className}`}
        >
          {loading && <Loading />}
          <h1 className="text-4xl text-center font-bold text-align-center mt-5">
            Welcome, {userInfo?.username ? userInfo.username : "User"}!
          </h1>
          <button
            onClick={logout}
            className="button bg-red-400 hover:bg-red-500 py-3 px-4 rounded-lg my-5 text-white"
          >
            Logout
          </button>
          <div className="w-full flex justify-between mt-10 mb-8">
            <div className="text-3xl w-fit text-bold border-b-4 border-purple-500">
              User List
            </div>
            {userInfo?.role === "admin" && (
              <button
                onClick={() => router.push("/users/add")}
                className="button py-3 px-4 bg-blue-300 hover:bg-blue-400 rounded-lg"
              >
                Add User
              </button>
            )}
          </div>
          <div className="flex gap-3 w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.users?.map((user) => {
              return (
                <UserCard key={user._id} id={user._id}>
                  <div className="flex flex-col items-start justify-between m-5">
                    <p className="text-2xl truncate w-[90%]">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-md mt-1 mb-2">{user.email}</p>
                    {user.role === "admin" ? (
                      <p className="text-md bg-purple-200 w-fit px-2 rounded">
                        {user.role}
                      </p>
                    ) : (
                      <p className="text-md bg-red-200 w-fit px-2 rounded">
                        {user.role}
                      </p>
                    )}
                  </div>
                </UserCard>
              );
            })}
          </div>
        </main>
      )}
    </>
  );
}
