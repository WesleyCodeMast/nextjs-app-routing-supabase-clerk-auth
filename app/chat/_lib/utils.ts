export function aggregateMessageLike(messages: any) {
  return messages.map((message) => {
    let temp: any = {};
    temp["createdAt"] = message.createdAt;
    temp["message"] = message.message;
    temp["authorId"] = message.authorId;
    temp["like"] = message.like;
    temp["id"] = message.id;
    temp["username"] = message.author.name;
    temp["userImage"] = message.author.image ?? null;
    temp["userRole"] = message.author.role;
    temp["userEmail"] = message.author.email;

    temp["isLiked"] = false;
    if (message?.likes?.length > 0) temp["isLiked"] = true;
    return temp;
  });
}
