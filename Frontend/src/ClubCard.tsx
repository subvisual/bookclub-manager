//Importo a interface
import { BookItem } from "./BookItem";
import type { BookClub } from "./callApi";
import { DeleteButton } from "./DeleteButton";

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
		// biome-ignore lint/a11y/useSemanticElements: A div funciona como button mas tem um button dentro, impossível substituir div por button, cfr sugerido pelo biome
		<div
			className="club-card"
			onClick={() => showClub(id)}
			/* onKeyDown evento do react, tecla à escuta, neste caso a tecla enter */
			onKeyDown={(e) => e.key === "Enter" && showClub(id)}
			/* a div comporta-se como button */

			role="button"
			/* permite ativar o click através de tab */
			tabIndex={0}
		>
			<BookItem book={currentBook} />
			<div className="club-card-info">
				<h2>{name}</h2>
				<p>{description}</p>
				<div className="current-book-info">
					<h3>Now reading</h3>
					<p>
						{currentBook.title}, by {currentBook.author}
					</p>
				</div>
				<hr />
				<h3>
					Next meeting • <span>{meetings[0].date}</span>
				</h3>
				{/* Passa as props para o DeleteButton, as props que são definidas no ButtonProps*/}
			</div>
			<div className="button-wrapper">
				<DeleteButton id={id} deleteClub={deleteClub} />
			</div>
		</div>
	);
}
