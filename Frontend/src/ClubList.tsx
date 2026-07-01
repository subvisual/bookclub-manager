import { ClubCard } from "./ClubCard";
import type { BookClub } from "./callApi";

//O App controla a navegação e agora ClubList precisa receber via props em vez de de ir buscar ao useClubs, uma vez que useClubs subiu para o App
type ClubListProps = {
	clubs: BookClub[];
	deleteClub: (id: number) => void;

	showClub: (id: number) => void;
};

export function ClubList({
	clubs,
	deleteClub,

	showClub,
}: ClubListProps) {
	// percorro o array através de map
	return (
		<>
			<div className="club-list">
				{clubs.map((club) => {
					// Passo para o card (key por causa do react)
					//Atualizei o card com
					return (
						<ClubCard
							key={club.id}
							{...club}
							deleteClub={deleteClub}
							showClub={showClub}
						/>
					);
				})}
			</div>
		</>
	);
}
