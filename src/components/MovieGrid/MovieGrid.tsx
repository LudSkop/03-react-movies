import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: () => void;
  movies: number[];
}
export default function MoveieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <>
      <ul className={css.grid}>
        {/* Набір елементів списку з фільмами */}{" "}
        <li>
          {" "}
          <div className={css.card}>
            {" "}
            <img
              className={css.image}
              src="https://image.tmdb.org/t/p/w500/poster-path"
              alt="movie title"
              loading="lazy"
            />
            <h2 className={css.title}>Movie title</h2>{" "}
          </div>{" "}
        </li>
      </ul>
    </>
  );
}
