import { ClubCard } from "./ClubCard";
import { useClubs } from "./useClubs";

export function ClubList() {
	// uso o hook criado em useClubs
	// Atualizei o ClubList com o delete
	const { clubs, deleteClub } = useClubs();
	// percorro o array através de map
	return clubs.map((club) => {
		// Passo para o card (key por causa do react)
		//Atualizei o card com
		return <ClubCard key={club.id} {...club} deleteClub={deleteClub} />;
	});
}
