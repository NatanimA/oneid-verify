"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  // Ensure that the router is only used on the client-side
  const router = useRouter();
  // const { query } = router;

  // const parameter1 = query.postName;
  // const parameter2 = query.postId;

  // console.log("testing the params", parameter1, parameter2);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const clientId = "c26a9630-02d0-4fe8-9874-eb2661899563";
  const client_secret = "a789d384-d463-42eb-89f4-63e5d5d6c0eb";
  const redirectUri = "https://sizzl-verify.netlify.app/";
  const authorizationEndpoint = "https://controller.myoneid.co.uk/v2/authorize";
  const scope = "age_over_18";
  const state = "Sizzl";

  console.log(
    "===================================================================="
  );
  console.log("encodeURIComponent", encodeURIComponent(redirectUri));
  console.log("encodeURIComponent", encodeURIComponent(scope));
  console.log("========================================================");

  const authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}`;

  const callUpdateUser = async () => {
    var data = JSON.stringify({
      // authorizationCode: vals?.authorizationCode,
      // isOneIdComplete: vals?.isOneIdComplete,
    });
    var config = {
      method: "post",
      url: `${URL}/user/update-profile-data`,
      headers: {
        // Authorization: `Bearer ${state().accessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // if (response.data?.success) {
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      {!showModal ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <iframe
            src={authorizationUrl}
            style={{
              width: "100%",
              height: "100vh",
            }}
            width={"100%"}
            height={"100vh"}
          />
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-items-center justify-between p-24">
          <>
            {/* Main modal */}
            {showModal && (
              <div
                id="successModal"
                tabIndex={-1}
                aria-hidden={!showModal}
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
              >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                  {/* Modal content */}
                  <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button
                      type="button"
                      className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={handleModalToggle}
                      data-modal-toggle="successModal"
                    >
                      <svg
                        aria-hidden={true}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                      <svg
                        aria-hidden={true}
                        className="w-8 h-8 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Success</span>
                    </div>
                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Successfully verified user.
                    </p>
                    <button
                      data-modal-toggle="successModal"
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                      onClick={handleModalToggle}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        </main>
      )}
    </div>
  );
}
