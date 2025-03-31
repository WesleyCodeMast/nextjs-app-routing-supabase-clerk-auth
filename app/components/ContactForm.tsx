"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { report } from "../lib/Report";
import { validateEmail } from "../lib/validation";

interface props {
  sendMessage: (data: any) => any;
}
const ContactForm: React.FC<props> = ({ sendMessage }) => {
  const { data: session, status } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<any>({
    name: false,
    email: false,
    message: false,
  });

  const _onChange = (e) => {
    e.preventDefault();
    let err = error;

    if (!e.target.value || e.target.value == "") {
      err[e.target.name] = true;
    } else {
      err[e.target.name] = false;
    }
    if (e.target.name == "email" && !validateEmail(e.target.value))
      err.email = true;

    setError(err);
  };

  const isValid = () => {
    let err: any = {
      name: false,
      email: false,
      message: false,
    };
    if (name == "") err.name = true;
    if (email == "" || !validateEmail(email)) err.email = true;
    if (message == "") err.message = true;

    setError(err);
    return err;
  };

  const submit = async (e) => {
    e.preventDefault();
    let err = isValid();

    if (err.name || err.email || err.message) return;
    // stop check for user logged in as its stupid
    // if (!session?.user) {
    //   report({
    //     type: "failure",
    //     title: "Sorry",
    //     message: "Please sign in...  or send email to support@ this domain",
    //     confirm: "confirm",
    //   });
    //   return;
    // }
    // send message
    const myEmail = session?.user?.email;
    //console.log(email);
    //console.log(name);
    const sended = await sendMessage({ name, email, message });

    if (sended) {
      report({
        type: "success",
        title: "Success",
        message: "sent successfully!",
        confirm: "OK",
      });
      setName("");
      setEmail("");
      setMessage("");
      setError({
        name: false,
        email: false,
        message: false,
      });
    } else {
      report({
        type: "failure",
        title: "Sorry",
        message: "Server Error has ocurred.",
        confirm: "confirm",
      });
    }
  };

  return (
    <form className="md:max-w-xl rounded-4xl ml-auto bg-white bg-opacity-80 px-11 pb-12 pt-8 shadow-md">
      <label
        className={`mb-4 block ${
          error.name ? "text-rose-500" : "text-gray-300"
        }`}
      >
        <p className="mb-2 font-semibold leading-normal">Name</p>
        <div className="relative">
          <svg
            className="absolute left-4 top-4"
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <input
            name="name"
            value={name}
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
              _onChange(e);
            }}
            className={`w-full border py-3 pl-12 pr-4 font-medium text-sky-700 placeholder-gray-300 outline-none border-${
              error.name ? "rose-500" : "gray-300"
            } current rounded-lg hover:border-sky-700`}
            id="contactInput3-1"
            type="text"
            placeholder="First &amp; last name"
          />
        </div>
      </label>
      <label
        className={`mb-4 block ${
          error.email ? "text-rose-500" : "text-gray-300"
        }`}
      >
        <p className="mb-2 font-semibold leading-normal">Email Address</p>
        <div className="relative ">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 transform"
            width="20"
            height="20"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            name="email"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
              _onChange(e);
            }}
            className={`border-1 w-full border py-3 pl-12 pr-4 font-medium text-sky-700 placeholder-gray-300 outline-none border-${
              error.email ? "rose-500" : "gray-300"
            } rounded-lg hover:border-sky-700`}
            id="contactInput3-2"
            type="text"
            placeholder="Email address"
          />
        </div>
      </label>
      <label
        className={`mb-4 block ${
          error.message ? "text-rose-500" : "text-gray-300"
        }`}
      >
        <p className="mb-2 font-semibold leading-normal">Message</p>
        <div className="relative text-current">
          <svg
            className="absolute left-4 top-4"
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <textarea
            name="message"
            value={message}
            onChange={(e) => {
              e.preventDefault();
              setMessage(e.target.value);
              _onChange(e);
            }}
            className={`mb-6 h-48 w-full p-4 px-12 border-${
              error.message ? "rose-500" : "gray-300"
            } resize-none rounded-lg border font-medium text-sky-700 placeholder-gray-300 outline-none hover:border-sky-700`}
            id="contactInput3-3"
            placeholder="Write message"
          ></textarea>
        </div>
      </label>
      <div className="md:inline-block">
        <button
          onClick={(e) => submit(e)}
          className="shadow-4xl w-full rounded-xl border border-sky-700 bg-sky-700 px-9 py-4 font-semibold text-white transition duration-200 ease-in-out hover:border-current hover:bg-sky-700"
          type="button"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
