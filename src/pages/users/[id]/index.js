import React from "react";
import Loading from "@/components/Loading";
import useGlobalContext from "@/provider/Provider";
import Head from "next/head";
import { useRouter } from "next/router";

function UserDetail() {
  const router = useRouter();
  const userId = router.query.id;

  const { isLoggedIn, fetchData, data, refreshState, loading } =
    useGlobalContext();

  React.useEffect(() => {
    refreshState();
    !isLoggedIn && router.push("/login");
    isLoggedIn && fetchData(`/api/users/${userId}`, "user");
  }, [isLoggedIn]);

  return (
    <>
      <Head>
        <title>User Management App - User Detail</title>
        <meta name="description" content="an App for managing user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoggedIn && data.user && (
        <>
          {loading && <Loading />}
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-[95%] sm:w-fit">
              <h1 className="text-4xl text-center font-bold text-align-center border-b-2 border-purple-400 pb-5 width-fit">
                User Detail
              </h1>
              <div className="grid sm:min-w-[200px] sm:grid-cols-2 gap-y-5 gap-x-14 mt-10">
                <div>
                  <h2>First Name</h2>
                  <p className="text-xl font-semibold">
                    {data?.user?.first_name || "-"}
                  </p>
                </div>
                <div>
                  <h2>Last Name</h2>
                  <p className="text-xl font-semibold">
                    {data?.user?.last_name || "-"}
                  </p>
                </div>
                <div>
                  <h2>Username</h2>
                  <p className="text-xl font-semibold">
                    {data?.user?.username || "-"}
                  </p>
                </div>
                <div>
                  <h2>Email</h2>
                  <p className="text-xl font-semibold">
                    {data?.user?.email || "-"}
                  </p>
                </div>
                <div>
                  <h2>Role</h2>
                  {data?.user?.role === "admin" ? (
                    <p className="text-xl bg-purple-200 mt-1 w-fit px-3 py-1 rounded">
                      {data?.user?.role}
                    </p>
                  ) : (
                    <p className="text-xl bg-red-200 mt-1 w-fit px-3 py-1 rounded">
                      {data?.user?.role}
                    </p>
                  )}
                </div>
              </div>
              <div className="width-full flex items-center justify-end mt-10">
                <button
                  onClick={() => router.push("/")}
                  className="bg-gray-500 hover:bg-gray-600 py-3 px-8 rounded-lg text-white"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserDetail;
