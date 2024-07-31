import React, { useEffect, useRef, useState } from "react";

const MyWebview = ({ authorizationUrl, redirectUri }) => {
  const iframeRef = useRef(null);
  const [isVerified, setIsVerified] = useState(false);

  const parseFragmentParams = (url) => {
    const params = new URLSearchParams(url.split("#")[1]);
    return {
      code: params.get("code"),
      id_token: params.get("id_token"),
      state: params.get("state"),
    };
  };

  const handleNavigation = async (url) => {
    console.log("Navigating to: ", url);

    if (
      url.startsWith(redirectUri) ||
      url.startsWith("https://verify.sandbox.oneid.uk/return")
    ) {
      const params = parseFragmentParams(url);
      console.log("testing te th eparams", params);
      const authorizationCode = params.code;
      const idToken = params.id_token;
      const state = params.state;

      if (authorizationCode) {
        console.log("Authorization Code:", authorizationCode);
        console.log("ID Token:", idToken);
        console.log("State:", state);
        setIsVerified(true);

        // exchangeCodeForToken(authorizationCode);
        // navigation.navigate("Home");
      }
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleIframeLoad = () => {
      try {
        const iframeWindow = iframe.contentWindow;

        const observer = new MutationObserver(() => {
          handleNavigation(iframeWindow.location.href);
        });

        observer.observe(iframeWindow.document, {
          subtree: true,
          childList: true,
        });

        return () => {
          observer.disconnect();
        };
      } catch (error) {
        console.error("Error accessing iframe content: ", error);
      }
    };

    iframe.addEventListener("load", handleIframeLoad);

    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
    };
  }, [authorizationUrl, redirectUri]);

  return (
    <iframe
      ref={iframeRef}
      src={authorizationUrl}
      style={{
        width: "100%",
        height: "100vh",
      }}
      width="100%"
      height="100vh"
    />
  );
};

export default MyWebview;
