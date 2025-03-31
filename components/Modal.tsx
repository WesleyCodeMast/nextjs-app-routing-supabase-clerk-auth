import classNames from "classnames";
import React from "react";

interface Props {
  show: boolean;
  title?: string;
  setShow: (boolean) => void;
  children: any;
  type?: any;
  submit?: () => void;
  close?: () => void;
}

const Modal: React.FC<Props> = ({
  title,
  show,
  setShow,
  children,
  type,
  submit,
  close,
}) => {
  const submitButton = () => {
    if (submit) submit();

    setShow(false);
  };
  const closetButton = () => {
    setShow(false);
  };
  return (
    <>
      {show ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative  mx-auto my-6 sm:w-full md:w-6/12">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                {title && (
                  <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                    <h6
                      className={classNames("text-3xl font-semibold", {
                        "text-red-500": type == "warning",
                      })}
                    >
                      {title}
                    </h6>
                    <button
                      className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                      onClick={() => setShow(false)}
                    >
                      <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                )}

                {/*body*/}
                <div className="relative flex-auto p-6">{children}</div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b  p-6">
                  {submit && (
                    <button
                      className="mb-1 mr-1 rounded bg-blue-400 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                      type="button"
                      onClick={closetButton}
                    >
                      Exit
                    </button>
                  )}
                  {submit && (
                    <button
                      className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                      type="button"
                      onClick={submitButton}
                    >
                      OK
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
