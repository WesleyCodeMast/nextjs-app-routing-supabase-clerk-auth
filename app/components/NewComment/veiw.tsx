import Image from "next/image";
import { CommentForm } from "./CommentForm";

export default function NewComment(props) {
  const comments = props?.comments;
  const count = props?.totalCount;
  const type = props?.type;
  const parent = props.parent;
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
          User Comments ({props?.totalCount ?? 0})
        </h2>
      </div>

      <CommentForm type={type} id={parent} />

      {comments.slice(0, count).map((comment) => {
        return (
          <div
            key={comment?.createdAt.toLocaleString()}
            className="border-t border-gray-200 bg-white p-6 text-base dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <picture>
                    {comment?.author?.image && (
                      <Image
                        unoptimized
                        className="mr-4 rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12"
                        src={userImage(comment?.author?.image)}
                        alt={
                          comment?.author?.name
                            ? comment?.author?.name
                            : "No Avatar"
                        }
                        width={100}
                        height={100}
                      />
                    )}
                    {!comment?.author?.image && (
                      <span className="mr-4 flex items-center justify-center rounded-full bg-yellow-500 text-white sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12">
                        {comment?.author?.name}
                      </span>
                    )}
                  </picture>
                  {comment?.author?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {comment?.createdAt.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {comment?.content}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function userImage(image) {
  let img = image ?? "/images/emptyuser.png";
  if (img.indexOf("http") == 0) {
    return img;
  }
  img = "/image/users/" + img; // if we store in blob then we use the image/users route

  return img;
}
