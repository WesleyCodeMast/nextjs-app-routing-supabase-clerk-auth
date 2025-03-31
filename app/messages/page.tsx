import monthYear from "@/components/functions/monthYear";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Messages from "../components/Notification/Message";
import {
  fetchAllMessages,
  removeItemfromNotificationlist,
} from "../lib/NotificationFetch";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = monthYear() + " Current online gambling guide list";
  const description =
    "Online casino guides with detailed information on slots, games and bonus types along with how to instructions.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const messages = await fetchAllMessages(userEmail);
  return (
    <div className="container mx-auto overflow-hidden text-current md:rounded-lg md:p-6 lg:p-8">
      <div className="h-12 md:h-20"></div>
      <p className="max-w-5xl font-sans text-4xl font-bold text-current md:text-6xl lg:pr-24 lg:text-7xl">
        All Messages!
      </p>
      <div className="h-10"></div>

      <Messages
        messages={messages}
        readMessage={removeItemfromNotificationlist}
      />
    </div>
  );
}
