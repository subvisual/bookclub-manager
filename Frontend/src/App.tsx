import { AddClubButton } from "./AddClubButton";
import "./App.css";
import { useState } from "react";
import logo from "./assets/owl-logo.png";
import { ClubDetails } from "./ClubDetails";
import { ClubDrawer } from "./ClubDrawer";
import { ClubList } from "./ClubList";
import type { BookClub } from "./callApi";
import { useClubs } from "./useClubs";

type NewBookClub = Omit<BookClub, "id">;

function App() {
	// Uso o hook criado em useClubs para ir buscar a lista de clubs e selectedClub
	// Fui buscar tb deleteClub e updateClub, uma vez que subiu do ClubList para o App
	const {
		clubs,
		selectedClub,
		showClub,
		deleteClub,
		updateClub,
		backToList,
		loading,
		error,
		createClub,
	} = useClubs();

	// Controla o estado do Drawer, no qual vão ser inseridos os dados do novo Club
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	function openAddClubDrawer() {
		setIsDrawerOpen(true);
	}

	function closeAddClubDrawer() {
		setIsDrawerOpen(false);
	}

	const [clubToEdit, setClubToEdit] = useState<BookClub | null>(null);
	function openEditDrawer(club: BookClub) {
		setClubToEdit(club);
		setIsDrawerOpen(true);
	}

	function handleSaveClub(clubForm: NewBookClub) {
		if (clubToEdit) {
			updateClub(clubToEdit.id, clubForm);
		} else {
			createClub(clubForm);
		}
		setClubToEdit(null);
		setIsDrawerOpen(false);
	}

	// Localizo o club por id, que é igual ao do selectedCLub
	const club = clubs.find((club) => club.id === selectedClub);
	// Se o selectedClub for igual a null ou se o club não existir(o id n existe na lista), mostra CLubList, se não ClubDetails

	if (loading) {
		return <p className="message">Loading...</p>;
	}

	if (error) {
		return <p className="message">Something is wrong.</p>;
	}
	return (
		<>
			<div className="header">
				<div className="header-left">
					<img src={logo} alt="owl logo" />
					<h1>The Club Room</h1>
				</div>
				<div className="header-button">
					<AddClubButton openAddClubDrawer={openAddClubDrawer} />
				</div>
			</div>

			<div className="page-content">
				<hr className="title-divider" />
				<ClubDrawer
					isOpen={isDrawerOpen}
					saveClub={handleSaveClub}
					closeDrawer={closeAddClubDrawer}
					clubToEdit={clubToEdit}
				/>
				{selectedClub == null || !club ? (
					// Preciso passar showClub para ClubList para o fluxo App -> ClubList -> ClubCard -> DetailsButton
					<ClubList showClub={showClub} deleteClub={deleteClub} clubs={clubs} />
				) : (
					<ClubDetails
						{...club}
						updateClub={updateClub}
						backToList={backToList}
						openEditDrawer={openEditDrawer}
					/>
				)}
			</div>
		</>
	);
}

export default App;
