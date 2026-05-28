import "./App.css";
import { ClubDetails } from "./ClubDetails";
import { ClubList } from "./ClubList";
import { useClubs } from "./useClubs";

function App() {
	// Uso o hook criado em useClubs para ir buscar a lista de clubs e selectedClub
	// Fui buscar tb deleteClub e updateClub, uma vez que subiu do ClubList para o App
	const { clubs, selectedClub, showClub, deleteClub, updateClub } = useClubs();
	// Localizo o club por id, que é igual ao do selectedCLub
	const club = clubs.find((club) => club.id === selectedClub);
	// Se o selectedClub for igual a null ou se o club não existir(o id n existe na lista), mostra CLubList, se não ClubDetails
	return selectedClub == null || !club ? (
		// Preciso passar showClub para ClubList para o fluxo App -> ClubList -> ClubCard -> DetailsButton
		<ClubList showClub={showClub} deleteClub={deleteClub} clubs={clubs} />
	) : (
		<ClubDetails {...club} updateClub={updateClub} />
	);
}

export default App;
