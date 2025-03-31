"use client";

import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";
import { newsCats } from "./NewsEdit";

interface props {
  item: any;
  subCategories?: any;
  show: boolean;
  setShow: (show: boolean) => void;
  submit: (news: any) => void;
}
const UpdateNewsModal: React.FC<props> = ({
  item,
  subCategories,
  show,
  setShow,
  submit,
}) => {
  const categories = newsCats;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(item?.title);
  const [id, setId] = useState(item?.id);
  const [description, setDescription] = useState(item?.description);
  const [subCategoryList, setSubCategoryList] = useState<any[]>();
  const [category, setCategory] = useState(item?.category);
  const [subCategory, setSubCategory] = useState(item?.subCategory);
  const [disableSubCategory, setDisibleSubCategory] = useState(true);

  const [image, setImage] = useState<any>(item?.image);
  useEffect(() => {
    setTitle(item?.title);
    setDescription(item?.description);
    setId(item?.id);
    setCategory(item?.category);
    if (item?.category == "software") {
      setSubCategoryList(subCategories.softwareCat);
      setDisibleSubCategory(false);
    }
    if (item?.category == "casino") {
      setSubCategoryList(subCategories.casinoCat);
      setDisibleSubCategory(false);
    }
    if (item?.category == "slot") {
      setSubCategoryList(subCategories.slotCat);
      setDisibleSubCategory(false);
    }

    setSubCategory(item?.subCategory);
    setImage(item?.image);
    setError({
      title: false,
      description: false,
      category: false,
      subCategory: false,
      image: {
        sizeErr: false,
        nullErr: false,
      },
      result: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const [error, setError] = useState<any>({
    title: false,
    description: false,
    category: false,
    subCategory: false,
    image: {
      sizeErr: false,
      nullErr: false,
    },
  });

  const _onChange = (e) => {
    e.preventDefault();
    let err = error;
    const val = e.target.value;
    if (!val || val == "") {
      err[e.target.name] = true;
    } else if (e.target.name === "category" && val === 0) err.category = true;
    else if (e.target.name === "subCategory" && val === 0)
      err.subCategory = true;
    else {
      err[e.target.name] = false;
    }
    if (
      e.target.name == "category" &&
      (val == "casino" || val == "software" || val == "slot")
    ) {
      err.subCategory = false;
      setDisibleSubCategory(false);
    }
    if (
      e.target.name == "category" &&
      (val == "" || (val != "casino" && val != "software" && val != "slot"))
    )
      setDisibleSubCategory(true);
    setError(err);
  };

  const _onClick = async () => {
    let err: any = isValid();
    setError(err);
    if (
      err.title ||
      err.description ||
      err.category ||
      err.subCategory ||
      err.image.sizeErr ||
      err.image.nullErr
    ) {
      return;
    }
    setLoading(true);
    let sended: any = await submit({
      id,
      title,
      category,
      subCategory,
      description,
      image,
    });
    //console.log(sended);
    if (sended) {
      setShow(false);
      setError({
        ...error,
        result: false,
      });
    } else {
      setError({
        ...error,
        result: true,
      });
    }
    setLoading(false);
  };

  const isValid = () => {
    let err: any = {
      title: false,
      description: false,
      category: false,
      subCategory: false,
      image: {
        nullErr: false,
        sizeErr: false,
      },
    };
    if (!title || title.length === 0) {
      err.title = true;
    }
    if (!description || description.length === 0) {
      err.description = true;
    }
    if (!category || category === 0) {
      err.category = true;
    }
    if (!subCategory || subCategory === 0) {
      err.subCategory = true;
    }
    if (!image || image.length === 0) {
      err.image.nullErr = true;
    }
    //console.log(category);
    if (
      category &&
      category != "software" &&
      category != "slot" &&
      category != "casino"
    )
      err.subCategory = false;

    return err;
  };
  const onSelectImage = (ev: any) => {
    // ev.preventDefault();
    let files = ev.target.files;
    let err: any = error;

    if (!files || !files[0]) {
      err.image.nullErr = true;

      setError(err);
      setImage(null);
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    const maxSize = 1024 * 1024;

    if (files[0]?.size > maxSize) {
      err.image.sizeErr = true;
      err.image.nullErr = true;
      setError(err);
      setImage(null);
      return;
    }
    err.image.sizeErr = false;
    err.image.nullErr = false;
    setError(err);
    reader.onload = (e) => {
      setImage(e.target?.result);
    };
  };
  const WarningElement = () => {
    return (
      <div
        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Warning</span> News update failed.
          <span className="font-medium">Warning</span>
        </div>
      </div>
    );
  };
  return (
    <Modal show={show} setShow={setShow} submit={_onClick}>
      {error?.result && <WarningElement />}
      <div>
        <h1 className="text-3xl font-bold mb-6 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
          </svg>
          &nbsp;&nbsp;Edit
          <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            &nbsp;News
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="flex justify-center text-3xl">
            <div className="mb-6">
              <div className="mt-2 flex justify-center rounded-xl bg-white">
                <div className="text-center">
                  {image && (
                    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
                    <img
                      src={image}
                      style={{ width: "168px", height: "132px" }}
                    />
                  )}
                  {!image && (
                    <svg
                      className="mx-auto h-48 fill-gray-300"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                  <div className="text-lg leading-5 text-current mt-4">
                    <label
                      htmlFor="img-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>{image ? "Change Image" : "Select Image"}</span>
                      <input
                        id="img-upload"
                        type="file"
                        className="sr-only"
                        name="img-upload"
                        onChange={(e) => {
                          onSelectImage(e);
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-current mt-4">
                    PNG, JPG, GIF Files...
                  </p>
                  {!error?.image?.sizeErr && error?.image?.nullErr && (
                    <p className="text-xs text-rose-500 leading-5 mt-4">
                      Please select a image.
                    </p>
                  )}
                  {error?.image?.sizeErr && (
                    <p className="text-xs text-rose-500 leading-5 mt-4">
                      Image size must be smaller than 1MB.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative col-span-3">
            <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline gap-4">
              <input
                type="text"
                id="name"
                placeholder="Title..."
                value={title}
                className={`w-full col-span-2 px-3 py-2 placeholder-gray-300 border ${
                  !error.title ? "border-gray-300" : "border-rose-500"
                } rounded-md focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 text-lg dark:focus:ring-gray-900 dark:focus:border-gray-500`}
                name="title"
                onChange={(e: any) => {
                  setTitle(e.target.value);
                  _onChange(e);
                }}
              />
              <select
                id="default"
                name="category"
                value={category}
                onChange={(e: any) => {
                  if (e.target.value == "software")
                    setSubCategoryList(subCategories.softwareCat);
                  if (e.target.value == "casino")
                    setSubCategoryList(subCategories.casinoCat);
                  if (e.target.value == "slot")
                    setSubCategoryList(subCategories.slotCat);
                  setSubCategory("");
                  setCategory(e.target.value);
                  _onChange(e);
                }}
                className={`bg-gray-50 border ${
                  !error.category ? "border-gray-300" : "border-rose-500"
                } text-current text-lg rounded-lg focus:outline-none focus:border-current block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              >
                <option value="">Select a Category</option>
                {categories &&
                  categories.length > 0 &&
                  categories.map((cat: any) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
              {!disableSubCategory && (
                <select
                  id="default"
                  name="subCategory"
                  value={subCategory}
                  onChange={(e: any) => {
                    setSubCategory(e.target.value);
                    _onChange(e);
                  }}
                  className={`bg-gray-50 border ${
                    !error.subCategory ? "border-gray-300" : "border-rose-500"
                  } text-current text-lg rounded-lg focus:outline-none focus:border-current block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                >
                  <option value="">Select a SubCategory</option>
                  {subCategoryList &&
                    subCategoryList.length > 0 &&
                    subCategoryList.map((cat: any, index: number) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              )}
              {disableSubCategory && (
                <select
                  id="default"
                  name="subCategory"
                  value={subCategory}
                  onChange={(e: any) => {
                    setSubCategory(e.target.value);
                    _onChange(e);
                  }}
                  className={`bg-gray-50 border ${
                    !error.subCategory ? "border-gray-300" : "border-rose-500"
                  } text-current text-lg rounded-lg focus:outline-none focus:border-current block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                  disabled
                >
                  <option value="">Select a SubCategory</option>
                </select>
              )}
            </div>
            <textarea
              rows={10}
              placeholder="description..."
              value={description}
              onChange={(e: any) => {
                setDescription(e.target.value);
                _onChange(e);
              }}
              className={`w-full px-3 py-2 placeholder-gray-300 border ${
                !error.description ? "border-gray-300" : "border-rose-500"
              } rounded-md mt-6 text-lg focus:outline-none focus:border-current dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500`}
              name="description"
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateNewsModal;
