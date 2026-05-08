//Importo a interface
import type { BookClub } from "./callApi";

//Para receber a function deleteClub. Extende BookClub
type ClubCardProps = BookClub & {
	deleteClub: (id: number) => void;
	updateClub: (id: number, updateClub: Partial<BookClub>) => void;
};

// Component para mostrar Club - {props} do BookClub
// Props deleteClub adicionada
export function ClubCard({
	name,
	description,
	currentBook,
	deleteClub,
	updateClub,
}: ClubCardProps) {
	return (
		<div>
			<h1>{name}</h1>
			<p>{description}</p>
			<p>{currentBook.title}</p>
			<p>{currentBook.author}</p>
		</div>
	);
}
