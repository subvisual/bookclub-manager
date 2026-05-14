//Importo a interface
import type { BookClub } from "./callApi";
import { DeleteButton } from "./DeleteButton";

//Para receber a function deleteClub. Extende BookClub
type ClubCardProps = BookClub & {
	deleteClub: (id: number) => void;
	updateClub: (id: number, updatedClub: Partial<BookClub>) => void;
};

// Component para mostrar Club - {props} do BookClub
// Props deleteClub adicionada
export function ClubCard({
	// O DeleteButton precisa do id para saber qual eliminar
	id,
	name,
	description,
	currentBook,
	deleteClub,
	updateClub,
}: ClubCardProps) {
	return (
		<div className="club-card">
			<h2>{name}</h2>
			<p>{description}</p>
			<p>{currentBook.title}</p>
			<p>{currentBook.author}</p>
			{/* Passa as props para o DeleteButton, as props que são definidas no ButtonProps*/}
			<DeleteButton id={id} deleteClub={deleteClub} />
		</div>
	);
}
