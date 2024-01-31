import { LiChessBlock } from "./lichess-embed";
import { YoutubeBlock } from "./youtube-embed";

export function LinkOrEmbed({ link }: { link: string }) {
  const domain = link.split("/")[2];
  
  switch (domain) {
    case "www.youtube.com":
      const youtubeId = link.split("v=")[1];
      return (
        <div className="w-full">
          <YoutubeBlock youtubeId={youtubeId} />
        </div>
      );
    case 'lichess.org':
        const liChessId = link.split("/")[3];
        return (
            <div className="w-full">
                <LiChessBlock liChessId={liChessId} />
            </div>
        )
    // case 'www.instagram.com':
    // case 'www.twitter.com':
    // case 'www.vimeo.com':
    default:
      return (
        <a href={link} target="_blank">
          {link}
        </a>
      );
  }
}
