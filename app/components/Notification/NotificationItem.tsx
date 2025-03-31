import Image from "next/legacy/image";

interface props {
  item: any;
  showDetail: (item: any) => void;
  removeItem: (item: any) => void;
}

const NotificationItem: React.FC<props> = ({
  item,
  showDetail,
  removeItem,
}) => {
  const showNotification = () => {
    // go
    showDetail(item);
  };

  const readNotification = async (e: any) => {
    e.stopPropagation();
    removeItem(item);
  };

  return (
    <div onClick={showNotification} className="group flex cursor-pointer gap-2">
      <div className="h-6 w-6 flex-none overflow-hidden rounded-full">
        <Image
          unoptimized
          src={item?.author?.image}
          className="object-cover"
          alt="avatar"
          width={100}
          height={100}
        />
      </div>
      <div className="relative flex-1">
        <p className="w-[185px] overflow-hidden text-ellipsis whitespace-nowrap pr-4 text-sm text-current dark:text-white">
          {item.message}
        </p>
        <p className="dark:text-darkmuted text-xs text-black/40">5m ago</p>
        <button
          onClick={readNotification}
          type="button"
          className="absolute right-0 top-1 hidden rotate-0 transition-all duration-300 hover:rotate-180 hover:opacity-80 group-hover:block dark:text-white/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
          >
            <path
              d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
