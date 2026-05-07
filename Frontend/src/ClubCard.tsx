//Importo a interface
import type { BookClub } from "./callApi";
import "./clubCard.css"

//Para receber a function deleteClub. Extende BookClub
type ClubCardProps = BookClub & {
	deleteClub: (id: number) => void;
};

// Component para mostrar Club - {props} do BookClub
// Props deleteClub adicionada
export function ClubCard({
	name,
	description,
	currentBook,
	deleteClub,
}: ClubCardProps) {
	return (
		<div className="club-card">
			<h2>{name}</h2>
			<p>{description}</p>
			<p>{currentBook.title}</p>
			<p>{currentBook.author}</p>
		</div>
	);
}
