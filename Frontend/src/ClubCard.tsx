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
	meetings,
}: ClubCardProps) {
	return (
		<div className="club-card" onClick={() => showClub(id)}>
			<div className="book-card"></div>
			<div className="club-card-info">
				<h2>{name}</h2>
				<p>{description}</p>
				<h3>Now reading</h3>
				<p>
					{currentBook.title}, by {currentBook.author}
				</p>
				<hr />
				<h3>
					Next meeting • <span>{meetings[0].date}</span>
				</h3>
				{/* Passa as props para o DeleteButton, as props que são definidas no ButtonProps*/}

				{/*<DetailsButton id={id} showClub={showClub} />*/}
			</div>
			<DeleteButton id={id} deleteClub={deleteClub} />
		</div>
	);
}
