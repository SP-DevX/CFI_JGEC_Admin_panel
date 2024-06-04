"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link"
import { Modal } from "flowbite-react";

const VerifyEmail: React.FC = () => {
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  const checkVerify = async () => {
    try {
      await axios.post("/api/auth/verify-email", { token });
      setVerify(true);
    } catch (error: any) {
      setVerify(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token.length > 0) checkVerify();
  }, [token]);

  return (
    <>
      <Modal show={true} size={"md"}>
        <Modal.Header>User Verification</Modal.Header>
        <Modal.Body>
          {verify ? (
            <h1 className="text-green-500 my-3 font-semibold">
              Verified
            </h1>
          ) : (
            <h1 className="text-red-500 my-3 font-semibold">
              Not Verified
            </h1>
          )}
          <Modal.Footer className="p-0 pt-2">
            {
              verify ?
                <Link href={'/login'} className={"bg-violet-500 text-white px-8 rounded-md py-2.5 cursor-pointer"}>
                  log in
                </Link>
                : <p className="text-red-500">Check your mail and then verify your account</p>
            }
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerifyEmail;
