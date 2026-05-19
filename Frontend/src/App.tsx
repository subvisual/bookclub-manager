import "./App.css";
import { ClubDetails } from "./ClubDetails";
import { ClubList } from "./ClubList";
import { useClubs } from "./useClubs";

function App() {
	// Uso o hook criado em useClubs para ir buscar a lista de clubs e selectedClub
	const { clubs, selectedClub } = useClubs();
	// Localizo o club por id, que é igual ao do selectedCLub
	const club = clubs.find((club) => club.id === selectedClub);
	// Se o selectedClub for igual a null ou se o club não existir(o id n existe na lista), mostra CLubList, se não ClubDetails
	return selectedClub == null || !club ? (
		<ClubList />
	) : (
		<ClubDetails {...club} />
	);
}

export default App;
