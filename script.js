async function getChannelId(usernameOrUrl, apiKey) {
  let username = usernameOrUrl;
  if (usernameOrUrl.includes("youtube.com")) {
    const url = new URL(usernameOrUrl);
    const path = url.pathname.split("/");
    if (path[1] === "c" || path[1] === "user") {
      username = path[2];
    } else if (path[1] === "channel") {
      return path[2];
    }
  }

  const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${username}&key=${apiKey}`);
  const data = await res.json();
  return data.items[0]?.id || null;
}
