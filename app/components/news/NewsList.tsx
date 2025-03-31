"use client";

import React, { lazy, useEffect, useState } from "react";
import NewsEdit from "./NewsEdit";
import NewsItem from "./NewsItem";
const factoryUpdateModal = () => import("./UpdateNewsModal");
const UpdateNewsModal = lazy(factoryUpdateModal);
const factoryModal = () => import("@/components/Modal");
const CustomModal = lazy(factoryModal);
interface props {
  news: any;
  userRole: any;
  subCategories: any;
  total: number;
  recentNews: any;
  getNews: (pageNum?: number) => any;
  updateNews: (news: any) => void;
  removeNews: (newsId: any) => void;
}

const NewsList: React.FC<props> = ({
  news,
  total,
  subCategories,
  recentNews,
  userRole,
  getNews,
  updateNews,
  removeNews,
}) => {
  const [optimisticNews, setOptimisticNews] = useState(news);
  const [pageNum, setPageNum] = useState(0);
  const [totalCount, setTotalCount] = useState(total);
  const [topNews, setTopNews] = useState(recentNews);
  const [item, setItem] = useState<any>();
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const addOptimisticNews = (data: any) => {
    data = { ...data, sending: true };
    let updatedNews = optimisticNews;
    updatedNews.unshift(data);
    setOptimisticNews(updatedNews);
  };

  const modifyOptimisticNews = (data: any) => {
    let updatedNews = optimisticNews.map((mes) => {
      if (mes.id === data["id"]) {
        return data;
      }
      return mes;
    });
    setOptimisticNews(updatedNews);
  };

  const submitNewNews = async (data: any) => {
    addOptimisticNews(data);
    let currentTopNews = topNews;

    const response = await fetch("/news/add", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    });

    const result: any = await response.json();

    if (result?.id) {
      let addedNews: any = data;
      addedNews.id = result.id;
      modifyOptimisticNews(addedNews);
      currentTopNews.unshift(addedNews);
      let addedTopNews = currentTopNews.slice(0, 4);
      setTopNews(addedTopNews);
      return true;
    }
    return false;
  };

  useEffect(() => {}, []);
  useEffect(() => {
    factoryModal();
  }, [deleteModalShow]);

  const readMore = async () => {
    let pgNum = pageNum + 1;

    const newList = await getNews(pgNum);
    if (!newList.result || newList?.result?.length == 0) return;

    let originList = optimisticNews;
    newList.result?.map((item: any) => {
      originList.push(item);
    });
    setOptimisticNews(originList);
    setPageNum(pgNum);
  };

  const dModalShow = (deleteItem: any) => {
    setItem(deleteItem);
    setDeleteModalShow(true);
  };

  const deleteNews = () => {
    let updatedNews = optimisticNews.filter((nItem) => nItem.id != item?.id);
    setOptimisticNews(updatedNews);
    let tempCount = totalCount;
    setTotalCount(tempCount - 1);
    removeNews(item);
    setDeleteModalShow(false);
  };

  const uModalShow = (updateItem: any) => {
    setItem(updateItem);
    setEditModalShow(true);
  };

  const editNews = async (item: any) => {
    modifyOptimisticNews(item);
    const response = await fetch("/news/update", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: item,
      }),
    });
    const result = await response.json();
    if (result) setEditModalShow(false);
    return result;
  };
  userRole = 9;
  return (
    <div className="max-w-screen-lg mx-auto px-3 py-6">
      {userRole !== undefined &&
        (userRole !== 1 || userRole == 3 || userRole == 9 || userRole == 0) && (
          <NewsEdit addNews={submitNewNews} subCategories={subCategories} />
        )}

      <h1 className="mb-6 flex text-3xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
            clipRule="evenodd"
          />
        </svg>
        &nbsp;&nbsp;News
      </h1>

      <div className="flex flex-col gap-6 pb-6">
        {optimisticNews &&
          optimisticNews.length > 0 &&
          optimisticNews.map((item: any, index: number) => (
            <NewsItem
              key={index}
              item={item}
              dModalShow={dModalShow}
              uModalShow={uModalShow}
              userRole={userRole}
            />
          ))}
        {!optimisticNews ||
          (optimisticNews.length === 0 && (
            <div className="px-3 pb-6 pt-2 text-center">
              <h2 className="text-xl font-semibold">There are no News!!!</h2>
            </div>
          ))}
      </div>
      {totalCount > optimisticNews.length && (
        <div className="flex items-center justify-center py-4">
          <button
            onClick={readMore}
            className="my-6 mr-2 flex cursor-pointer items-center justify-center rounded-lg bg-sky-700 px-10 py-3 text-white dark:bg-white dark:text-black"
          >
            Read More →
          </button>
        </div>
      )}
      <CustomModal
        title="Danger Alert!"
        show={deleteModalShow}
        setShow={setDeleteModalShow}
        type="warning"
        submit={deleteNews}
      >
        <p>Remove this News?</p>
      </CustomModal>
      <UpdateNewsModal
        item={item}
        subCategories={subCategories}
        show={editModalShow}
        setShow={setEditModalShow}
        submit={editNews}
      />
    </div>
  );
};

export default NewsList;
