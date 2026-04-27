//Importo a interface
import type { BookClub } from "./callApi";

//Para receber a function delClub. Extende BookClub
type ClubCardProps = BookClub & {
	delClub: (id:number) => void;
}

// Component para mostrar Club - {props} do BookClub
// Props delClub adicionada
export function ClubCard({ name, description, currentBook, delClub }: ClubCardProps) {
	return (
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
			<p>{currentBook.title}</p>
			<p>{currentBook.author}</p>
		</div>
	);
}
