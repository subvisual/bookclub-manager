//Importo a interface
import type { BookClub } from "./callApi";
import { DeleteButton } from "./DeleteButton";
import { DetailsButton } from "./DetailsButton";

//Para receber a function deleteClub. Extende BookClub
type ClubCardProps = BookClub & {
	deleteClub: (id: number) => void;

	showClub: (id: number) => void;
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
	showClub,
}: ClubCardProps) {
	return (
		<div className="club-card">
			<div className="book-card"></div>
			<div className="club-card-info">
				<h2>{name}</h2>
				<p>{description}</p>
				<p>{currentBook.title}</p>
				<p>{currentBook.author}</p>
				{/* Passa as props para o DeleteButton, as props que são definidas no ButtonProps*/}
				<DeleteButton id={id} deleteClub={deleteClub} />
				<DetailsButton id={id} showClub={showClub} />
			</div>
		</div>
	);
}
