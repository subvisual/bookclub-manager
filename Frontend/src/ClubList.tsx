import { ClubCard } from "./ClubCard";
import { useClubs } from "./useClubs";

export function ClubList() {
	// uso o hook criado em useClubs
	const clubs = useClubs();
	// percorro o array através de map
	return clubs.map((club) => {
		// Passo para o card (key por causa do react)
		return <ClubCard key={club.id} {...club} />;
	});
}
