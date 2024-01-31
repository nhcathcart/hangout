export interface Props {
  liChessId: string;
}
export function LiChessBlock({ liChessId }: Props) {
  return (
    <iframe
      src={`https://lichess.org/embed/game/${liChessId}?theme=auto&bg=auto#32`}
      width={600}
      height={397}
      className="w-full rounded object-scale-down"
    />
  );
}
