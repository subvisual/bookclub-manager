//Importo a interface
import type { BookClub } from "./callApi";

// Component para mostrar Club - {props} do BookClub
export function ClubCard({ name, description, currentBook }: BookClub) {
	return (
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
			<p>{currentBook.title}</p>
			<p>{currentBook.author}</p>
		</div>
	);
}
