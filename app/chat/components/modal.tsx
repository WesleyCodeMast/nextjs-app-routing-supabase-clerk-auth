import React from "react";

interface Props {
  show: boolean;
  title?: any;
  setShow: (boolean) => void;
  children: any;
  type?: any;
  submit?: () => void;
  cancel?: () => void;
}

const Modal: React.FC<Props> = ({
  title,
  show,
  setShow,
  children,
  type,
  submit,
  cancel,
}) => {
  const submitButton = () => {
    if (submit) submit();
    debugger;
    setShow(false);
  };

  return (
    <>
      {show ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="max-w-3xl relative mx-auto my-6 w-auto">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                {title && (
                  <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                    <h6 className="text-3xl font-semibold text-gray-800">
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
                {(submit || cancel) && (
                  <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                    {submit && (
                      <button
                        type="button"
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={submitButton}
                      >
                        Ok
                      </button>
                    )}

                    {cancel && (
                      <button
                        type="button"
                        className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                        onClick={cancel}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                )}
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
